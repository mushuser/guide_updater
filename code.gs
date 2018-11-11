redditlib.init_project(secret.subreddit, secret.secret_sr, secret.creds_main, secret.creds_voters, secret.folder_id, secret.flair_mapping)
redditlib.check_init()


updaterlib.init_project(secret.doc_sr, secret.doc_filename, secret.doc_id, secret.doc_wiki, secret.page_header)
updaterlib.check_init()


function get_rev() {
  var guide_fullrev = updaterlib.get_fullrev()
  var guide_rev = updaterlib.get_guiderev(guide_fullrev)  
  
  return guide_rev
}

function insert_date() {
  var doc = DocumentApp.getActiveDocument()
  var text = updaterlib.get_datestr() + " [" + (parseInt(get_rev())+1) + "] "
  var current_pos = doc.getCursor()
  current_pos.insertText(text)
  var new_pos = doc.newPosition(current_pos.getElement(), current_pos.getOffset()+1);
  doc.setCursor(new_pos)
}

function dateupdate(date) {
  doc = DocumentApp.getActiveDocument()
  body = doc.getBody()
  
  searchPattern = "更新日期："
  newpattern = searchPattern + date
  
  body.replaceText("^"+searchPattern+".*$", newpattern)
  
  return HtmlService.createHtmlOutput("Done")     
}

function force_update() {
  updaterlib.batch_update_doc_force()
}

function onOpen() {
  var ui = DocumentApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Guide')
      .addItem('Update guide forcely', 'force_update')
      .addItem('Insert date string', 'insert_date')
      .addToUi();
}
