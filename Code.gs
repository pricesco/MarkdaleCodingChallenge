function autoFillIPSTemplateGoogleDoc() {

  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  e = data[1]
  // declare variables from Google Sheet
  let investorName = e[1]
  let timeStamp = e[0]
  let emailID = e[2]
  // convert values from column 3 of Google Sheet to string
  const goals = e[4].toString();

  // declare goal variables
  let goal1 = ""
  let goal2 = ""
  let goal3 = ""

  //create an array and parse values from CSV format, store them in an array
  goalsArr = goals.split(',')
  if (goalsArr.length >= 1)
    goal1 = goalsArr[0]
  if (goalsArr.length >= 2)
    goal2 = goalsArr[1]
  if (goalsArr.length >= 3)
    goal3 = goalsArr[2]

  //Creates an array of choices. Ideally this is done by referencing the Google form to ensure
  //any change made to the google form automatically also changes the choices.
  let choices = ["support my heirs", "generate income", "fund my children's education", "save for future retirement", "support for charity", "generate income"]
  let goalsNumsArr = convertToNum(goalsArr, choices)

//grab the template file ID to modify
  const file = DriveApp.getFileById(templateID);

//grab the Google Drive folder ID to place the modied file into
  var folder = DriveApp.getFolderById(folderID)

//create a copy of the template file to modify, save using the naming conventions below
  var copy = file.makeCopy(investorName + ' Investment Policy', folder);

//modify the Google Drive file
  var doc = DocumentApp.openById(copy.getId());

  var body = doc.getBody();

  body.replaceText('%InvestorName%', investorName);
  body.replaceText('%Date%', timeStamp);

  body.replaceText('%Goal1%', goal1.trim())
  body.replaceText('%Goal2%', goal2.trim())
  body.replaceText('%Goal3%', goal3.trim())

  doc.saveAndClose();

//find the file that was just modified, convert to PDF, attach to e-mail, send e-mail
  var attach = DriveApp.getFileById(copy.getId());
  var pdfattach = attach.getAs(MimeType.PDF);
  MailApp.sendEmail(emailID, subject, emailBody, { attachments: [pdfattach] });
}