import fs from 'fs';
import path from 'path';

export function saveToJSON(data, fileName = 'EmployeeList') {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    console.log('No data provided to save.');
    return;
  }

  const dir = './test-results';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `${fileName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`JSON file saved successfully: ${filePath}`);
  return filePath;
}
