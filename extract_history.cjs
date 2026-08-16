const fs = require('fs');
const readline = require('readline');

async function extractFiles() {
  const fileStream = fs.createReadStream('C:\\Users\\Hype AMD\\.gemini\\antigravity\\brain\\b00ab879-a368-48cc-8bad-3d49ddd35814\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const filesToFind = [
    'src/components/Hero.jsx',
    'src/pages/Portfolio.jsx',
    'src/components/About.jsx',
    'src/components/Projects.jsx',
    'src/index.css'
  ];

  const results = {};

  for await (const line of rl) {
    try {
      const step = JSON.parse(line);
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          if (tc.name === 'default_api:multi_replace_file_content' || tc.name === 'default_api:view_file') {
            // Check if it's one of our target files
            for (const file of filesToFind) {
              // Only get the FIRST occurrence (oldest in the transcript, assuming it's read sequentially)
              // Wait, transcript is chronological. The FIRST occurrence is the oldest state!
              if (JSON.stringify(tc.args).includes(file)) {
                if (!results[file]) {
                  results[file] = [];
                }
                // Save the tool call context to manually review
                results[file].push({
                  step: step.step_index,
                  action: tc.name,
                  args: tc.args
                });
              }
            }
          }
        }
      }
      
      // Check tool responses for view_file
      if (step.type === 'TOOL_RESPONSE' && step.content) {
        for (const file of filesToFind) {
          if (step.content.includes(file) && step.content.includes('The following code has been modified')) {
             if (!results[file + '_content']) {
                results[file + '_content'] = step.content.substring(0, 500); // just print start to verify
             }
          }
        }
      }
    } catch(e) {}
  }
  
  console.log(JSON.stringify(results, null, 2));
}

extractFiles();
