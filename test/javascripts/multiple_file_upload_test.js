module("Uploading multiple files", {
  setup: function() {
    this.fieldset = $('<fieldset class="multiple_file_uploads"></fieldset>');
    var file_upload = $('<div class="file_upload"></div>');
    this.first_input = $('<input id="document_attachments_attributes_0_file" name="document[attachments_attributes][0][file]" type="file" />')
    file_upload.append(this.first_input);
    file_upload.append('<input id="document_attachments_attributes_0_file_cache" name="document[attachments_attributes][0][file_cache]" type="hidden" />');

    this.fieldset.append(file_upload);
    $('#qunit-fixture').append(this.fieldset);
    this.fieldset.enableMultipleFileUploads();
  }
});

test("should add a new file input when a file is selected", function() {
  this.first_input.change();
  equal(this.fieldset.children(".file_upload").length, 2);
});

test("should not add a new file input when a selected file is changed", function() {
  this.first_input.change();
  this.first_input.change();
  equal(this.fieldset.children(".file_upload").length, 2);
});

test("should continue adding new inputs as new files are selected", function() {
  this.first_input.change();
  this.fieldset.find("input[type=file]:last").change();
  equal(this.fieldset.children(".file_upload").length, 3);

  this.fieldset.find("input[type=file]:last").change();
  equal(this.fieldset.children(".file_upload").length, 4);
});

test("should increment the ID and name of the file inputs for each new input added", function() {
  this.fieldset.find("input[type=file]:last").change();
  var latest_input = this.fieldset.find("input[type=file]:last")[0];
  equal(latest_input.id, "document_attachments_attributes_1_file");
  equal(latest_input.name, "document[attachments_attributes][1][file]");

  this.fieldset.find("input[type=file]:last").change();
  latest_input = this.fieldset.find("input[type=file]:last")[0];
  equal(latest_input.id, "document_attachments_attributes_2_file");
  equal(latest_input.name, "document[attachments_attributes][2][file]");
});

test("should increment the ID and name of the hidden cache inputs for each new input added", function() {
  this.fieldset.find("input[type=file]:last").change();
  var latest_input = this.fieldset.find("input[type=hidden]:last")[0];
  equal(latest_input.id, "document_attachments_attributes_1_file_cache");
  equal(latest_input.name, "document[attachments_attributes][1][file_cache]");

  this.fieldset.find("input[type=file]:last").change();
  latest_input = this.fieldset.find("input[type=hidden]:last")[0];
  equal(latest_input.id, "document_attachments_attributes_2_file_cache");
  equal(latest_input.name, "document[attachments_attributes][2][file_cache]");
});

test("should set the value of the hidden cache inputs to blank for each new input added", function() {
  $("input[type=hidden]:last").val("not-blank");
  this.fieldset.find("input[type=file]:last").change();
  var latest_input = this.fieldset.find("input[type=hidden]:last");
  equal(latest_input.val(), "");
});

test("should set the text of the already_uploaded element to blank for each new input added", function() {
  already_uploaded = $('<span class="already_uploaded">some-file.pdf already uploaded</span>');
  $("input[type=file]:last").after(already_uploaded);
  this.fieldset.find("input[type=file]:last").change();
  equal(this.fieldset.find(".already_uploaded").length, 2);
  equal(this.fieldset.find(".already_uploaded:last").text(), "");
});