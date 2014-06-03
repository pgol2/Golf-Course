var ScormCourse = (function(ScormCourse, Handlebars) {
    'use strict';

    var templatesHTML = [];
    templatesHTML.push($('#slideTemplate').html());
    templatesHTML.push($('#contentList').html());

    //compiled templates array
    var templates=  [];
    for(var i=0; i<templatesHTML.length; i++) {
        templates.push(Handlebars.compile(templatesHTML[i]));
    }


    for(var j=0; j<templates.length; i++) {
        console.log(templates[i]);
    }





    return ScormCourse;
}(ScormCourse || {}, Handlebars));