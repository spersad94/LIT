/**
 * Folder represents a collection of Notes created by an owner and stored.
 *
 * The folder is identified by an immutable (randomly generated) ID
 * and by a mutable user-designated name
 *
 * The note can be shared with a mutable set of Users.
 * 
 */

var Folder = function(name, owner, ID)
{
  this.ID = 'Folder_'+owner+ID;

  // Owner (should be an instance of the User class. Right now, it's a string) of the document
  this.owner = owner;
  this.name = name;
  this.sharedUsers = [] ;
  this.files = {} ;
  this.folders = {} ;
  this.templates = {};
  this.parentFolder = null;
  this.recycled = false;
  // Other details to be filled out at a more relaxed time
  this.createDate = 0;
  this.modifiedDate = 0;


  /* 
   * Renames the folder given a new name
   */
  this.renameFolder = function(newName)  {
    this.name = newName; 
  }

  /* 
   * Add a note to the folder.
   */
  this.addFile = function(addNote)  {
    var key = addNote.ID
    this.files[key] = addNote; 
    console.log('Add file' +addNote.ID+ ' into '+ this.ID);
    addNote.parentFolder = this;
  }

  /* 
   * Add another folder to the folder.
   */
  this.addFolder = function(addFolder)  {
    var key = addFolder.ID;
    this.folders[key] = addFolder;
    console.log('Add folder' +addFolder.ID+ ' into '+ this.ID);
    addFolder.parentFolder = this;
  }

  /* 
   * Add another folder to the folder.
   */
  this.addTemplate = function(addTemplate)  {
    var key = addTemplate.ID;
    this.templates[key] = addTemplate;
    console.log('Add template' +addTemplate.ID+ ' into '+ this.ID);
    addTemplate.parentFolder = this;
  }

  /* 
   * Delete a note to the folder.
   */
  this.deleteFile = function(addNote)  {
    var key = addNote.ID;
    delete this.files[key];
    console.log('Deleted file' +addNote.ID+ ' from '+ this.ID);
  }

  /* 
   * Add another folder to the folder.
   */
  this.deleteFolder = function(addFolder)  {
    var key = addFolder.ID;
    delete this.folders[key];
    console.log('Deleted folder ' +addFolder.name+ ' from '+ this.ID);
  }

  /* 
   * Add another folder to the folder.
   */
  this.deleteTemplate = function(addTemplate)  {
    var key = addTemplate.ID;
    delete this.templates[key];
    console.log('Deleted template' +addTemplate.ID+ ' from '+ this.ID);
  }


  /* 
   * Given a valid User object, user, adds this user to the set of
   * shared owners
   */
  this.shareFile = function(user){
    this.sharedUsers.push(user);
  }

  /* 
   * Change the name of the note to newName
   */
  this.updateName = function(newName){
    console.log('Renaming '+this.name+' to '+newName);
    this.name = newName;
  }

  /*
   * Returns true if there are subfolders within this folder. Otherwise, false.
   */

  this.hasFolders = function(){
    return Object.keys(this.folders).length == 0;
  }

  /*
   * Returns true if there are files within this folder. Otherwise, false.
   */

  this.hasFiles = function(){
    return Object.keys(this.files).length == 0;
  }

  /*
   * Returns true if there are templates within this folder. Otherwise, false.
   */

  this.hasTemplates = function(){
    return Object.keys(this.templates).length == 0;
  }

  /* 
   * Given an ID, return the Folder object corresponding to the ID if it exists
   */
  this.getFolder = function(ID){
    if (ID in this.folders){
      return this.folders[ID];
    }
    else{
      console.log(ID+" folder not found");
      return false;
    }
  }

  /* 
   * Given an ID, return the Folder object corresponding to the ID if it exists
   */
  this.getFile = function(ID){
    if (ID in this.files){
      return this.files[ID];
    }
    else{
      console.log(ID+" file not found");
      return false;
    }
  }

  this.recycle = function(){
    this.recycled = true;

    for (var key in this.folders) {
      newFolder = this.folders[key];  
      newFolder.recycle()
    }

    for (var key in this.files) {
      newFile = this.files[key];  
      newFile.recycle()
    }

    for (var key in this.templates) {
      newTemplate = this.templates[key];  
      newTemplate.recycle()
    }
  }

  this.isRecycled = function(){
    return this.recycled;
  }

  this.restore = function(){
    this.recycled = false;

    for (var key in this.folders) {
      newFolder = this.folders[key];  
      newFolder.restore()
    }

    for (var key in this.files) {
      newFile = this.files[key];  
      newFile.restore()
    }

    for (var key in this.templates) {
      newTemplate = this.templates[key];  
      newTemplate.restore()
    }
  }
  
}
  