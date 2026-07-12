const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'backend', 'src');

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.service.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Check if it already has PrismaService
      if (!content.includes('PrismaService')) {
        // Add import
        content = content.replace(
          "import { Injectable } from '@nestjs/common';",
          "import { Injectable } from '@nestjs/common';\nimport { PrismaService } from '../prisma.service';"
        );
        
        // Add constructor
        content = content.replace(
          /export class [A-Za-z0-9_]+ {/,
          "$& \n  constructor(private prisma: PrismaService) {}"
        );
        
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', fullPath);
      }
    }
  }
}

traverse(srcDir);
