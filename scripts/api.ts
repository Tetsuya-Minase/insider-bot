function getWordData(): string[] {
  const sheet = SpreadsheetApp.getActive().getSheetByName('ワード');
  if (sheet == null) {
    return [];
  }
  return (
    sheet
      // A列にワードが入っているので全部取ってくる
      .getRange('A:A')
      .getValues()
      // 配列の1個目に単語が入っているので、入っているもののみで絞る
      .filter((value): value is string[] => !!value[0])
      // 二次元配列担ってしまっているので戻す
      .reduce((pre, cur) => [...pre, ...cur], [])
  );
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
