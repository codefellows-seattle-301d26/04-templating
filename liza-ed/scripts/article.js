'use strict';

let articles = [];

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}
// TODO: Use Handlebars to render your articles. Get your template from the DOM and "compile" your template with Handlebars.
Article.prototype.toHtml = function() {
  var theTemplateScript = $('#myTemp').html();

  let template = Handlebars.compile($(theTemplateScript).html())

  var context={
    author: this.author,
    authorUrl: this.authorUrl,
    title: this.title,
    category: this.category,
    body: this.body,
    publishedOn: this.publishedOn
  };

  var theCompiledHtml = template(context);
  $('#articles').append(theCompiledHtml);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

  // TODO: Use the method that Handlebars gave you to return your filled-in html template for THIS article.
  articles.forEach(article => {
    let $sectionEl = $('.article-body');
    let $completeTemplate = ($('#articles').innerHtml = template(article));

    $sectionEl.append($completeTemplate)
    console.log('hello')
  })
};
// REVIEW: If your template will use properties that aren't on the object yet, add them.
// Since your template can't hold any JS logic, we need to execute the logic here.
// The result is added to the object as a new property, which can then be referenced by key in the template.
// For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:


// $(function () {
//   // Grab the template script
//   var theTemplateScript = $("#address-template").html();

//   // Compile the template
//   var theTemplate = Handlebars.compile(theTemplateScript);

//   // Define our data object
//   var context={
//     author: this.author,
//     authorUrl: this.authorUrl,
//     title: this.title,
//     category: this.category,
//     body: this.body,
//     publishedOn: this.publishedOn
//   };

//   // Pass our data to the template
//   var theCompiledHtml = theTemplate(context);

//   // Add the compiled html to the page
//   $('.content-placeholder').html(theCompiledHtml);
// });


// COMMENT: Why are there parentheses around "(a,b)" in the .sort() method, but not around the "articleObject" or "article" arguments in the .forEach() methods?
// PUT YOUR RESPONSE HERE
rawData.sort((a,b) => {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(articleObject => {
  articles.push(new Article(articleObject));
});

articles.forEach(article => {
  $('#articles').append(article.toHtml());
});
