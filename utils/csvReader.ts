import { User, UserModel } from "../models/User";
import fs from 'fs';
import { parse } from 'papaparse';
import { config } from './../config/index';

let sharedDataFolder = config.SHARED_FOLDER;
let testDataFolder = config.TEST_DATA_FOLDER;

export async function readUserCsv(filename: string): Promise<User[]> {
  try {
    // Check if the file exists
    const filePath = `${testDataFolder}/${filename}`;
    if (!fs.existsSync(filePath)) {
      throw new Error(`CSV file not found: ${filePath}`);
    }

    const csvFile = fs.readFileSync(filePath, 'utf8');
    
    const results = parse<User>(csvFile, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transform: (value: string, field: string) => {
        if (field === 'registrationNumber') return parseInt(value);
        return value;
      }
    });

    if (results.errors.length > 0) {
      throw new Error(`CSV parsing errors: ${JSON.stringify(results.errors)}`);
    }

    return results.data.map(row => new UserModel(
      row.username,
      row.password,
      row.email,
      row.registrationNumber
    ));
  } catch (error) {
    throw new Error(`Failed to read CSV file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function readRegistrationNumber(file: string) {
  const filePath = `${testDataFolder}/${file}`;
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }

  const csvFile = fs.readFileSync(filePath, 'utf8');
  const results = parse(csvFile, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transform: (value: string, field: string) => {
      if (field === 'registrationNumber') return parseInt(value);
      return value;
    }
  });

  if (results.errors.length > 0) {
    throw new Error(`CSV parsing errors: ${JSON.stringify(results.errors)}`);
  }

}
  

export async function saveRegistrationNumberToCsv(registrationNumber: number) {
  // Check if the file exists
  const filePath = `${sharedDataFolder}/registrationNumbers.csv`;
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }
  const date = new Date();
  const csv = `${process.env.BROWSER_NAME},${process.env.TEST_NAME},${date.toLocaleString()},'${registrationNumber}'\n`;
  try {
    await fs.promises.appendFile(filePath, csv);
  } catch (error) {
    if (error instanceof Error && error.message.includes('ENOENT')) {
      await fs.promises.writeFile(filePath, 'browser,test,date,registrationNumber\n' + csv);
    } else {
      throw error;
    }
  }
}
