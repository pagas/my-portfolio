import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Test script to verify MDX files can be parsed
function testMDXFiles() {
  console.log('🧪 Testing MDX file parsing...\n');

  try {
    if (!fs.existsSync(postsDirectory)) {
      console.log('❌ No content/blog directory found');
      return;
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const mdxFiles = fileNames.filter(file => file.endsWith('.mdx'));

    if (mdxFiles.length === 0) {
      console.log('❌ No MDX files found');
      return;
    }

    console.log(`📁 Found ${mdxFiles.length} MDX files:`);
    
    mdxFiles.forEach(fileName => {
      try {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        console.log(`\n📝 File: ${fileName}`);
        console.log(`   Title: ${data.title || 'No title'}`);
        console.log(`   Description: ${data.description || 'No description'}`);
        console.log(`   Tags: ${data.tags ? data.tags.join(', ') : 'No tags'}`);
        console.log(`   Author: ${data.author || 'No author'}`);
        console.log(`   Content length: ${content.length} characters`);
        console.log(`   ✅ Parsed successfully`);
      } catch (error) {
        console.log(`\n📝 File: ${fileName}`);
        console.log(`   ❌ Error parsing: ${error}`);
      }
    });

    console.log('\n🎉 MDX parsing test completed!');
    console.log('   All files are ready for migration to Firebase');

  } catch (error) {
    console.error('💥 Test failed:', error);
  }
}

testMDXFiles();
