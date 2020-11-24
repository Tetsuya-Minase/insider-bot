function getWordData(): string[] {
  return ['hoge', 'huga', 'piyo'];
}

function doGet() {
  const wordData = getWordData();
  const result = {
    word: wordData
  };
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(result));
  return output;
}
