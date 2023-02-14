import fs from "fs";

function main() {
  let fileContent: string = "Not loaded";

  fs.readFile("package.json", (err, data) => {
    fileContent = data.toString();
  });
  console.log(fileContent);
}

main();
