import * as fs from 'fs';
import * as path from 'path';
import { gzipSync, constants } from 'zlib';
import pkg from 'javascript-obfuscator';
const { obfuscate } = pkg;

function obf(code: string) {
    let obfuscatedCode = obfuscate(
        code,
        {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            numbersToExpressions: true,
            simplify: true,
            shuffleStringArray: true,
            splitStrings: true,
            stringArrayThreshold: 0.75
        }
    ).getObfuscatedCode();
    return obfuscatedCode;
}

// 扫描目录下所有main_开头的文件并返回文件名列表（不含扩展名）
function scanMainFiles(directoryPath: string): string[] {
  try {
    // 检查目录是否存在
    if (!fs.existsSync(directoryPath)) {
      console.error(`错误：目录 ${directoryPath} 不存在`);
      return [];
    }

    // 读取目录内容
    const files = fs.readdirSync(directoryPath);
    
    // 过滤出main_开头的文件，并提取文件名（不含扩展名）
    return files
      .filter(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);
        return stats.isFile() && file.startsWith('main_') && file.endsWith('.ts');
      })
      .map(file => path.parse(file).name);
  } catch (error) {
    console.error(`扫描目录时出错：${(error as Error).message}`);
    return [];
  }
}

const target = scanMainFiles("./")

for (let t of target) {
    const filePath = path.join('dist', t + ".js");
    const fileContent = obf(fs.readFileSync(filePath, 'utf-8'));
    fs.writeFileSync(filePath, fileContent)

    const base64Content = gzipSync(Buffer.from(fileContent, 'utf-8'), {
        level: constants.Z_BEST_COMPRESSION,
        memLevel: constants.Z_BEST_COMPRESSION,
    }).toString('base64')

    const tsContent = `import { gunzipSync } from 'zlib';\nlet impl: any;\n(async ()=>{\n    impl = await eval(gunzipSync(Buffer.from('${base64Content}', 'base64')).toString('utf-8'));\n})();`;

    const outputFilePath = path.join('dist', t + ".ts");
    fs.writeFileSync(outputFilePath, tsContent);

    console.log(`Generated TypeScript file at ${outputFilePath}`);
}
