/**
 * Report custom event
 *
 * @param id - key of the event
 * @param name - name or id of the event
 * @param parentLabel - name or id of the parent label
 */
function countlyClickEvent(id, name, parentLabel){
    var sessionId = getCookie("C_SESSION_ID");
    var event = getCookie("lastEvent");
    var lastEvent = (event == "" || event == undefined || event == null) ? "-" : event;
    var timestamp = new Date().getTime();

    Countly.q.push(
        ['add_event',{
            "session_id": sessionId,
            key:id,
            "segmentation": {
                "name": escape(name),
                "parentLabel": escape(parentLabel),
                "timestamp": timestamp,
                "lastEvent": lastEvent
            }
        }]
    );
    //save the name of current event
    var lastId = id + '-' + timestamp;
    setCookie("lastEvent", lastId);

};

/**
 * Provide information about user
 *
 * @param userId - id of user
 * @param userName - user's username or nickname
 * @param orgId - user's department id
 */
function countlyUserDetail(userId, userName, orgId) {
    var sessionId = getCookie("C_SESSION_ID");
    var os = navigator.platform;
    var app_version = navigator.appVersion;
    var resolution = window.screen.width + ' * ' + window.screen.height;
    var channel = navigator.appName;
    Countly.q.push(
        ['user_details',{
            "custom": {
                "session_id": sessionId,
                "client_id": userId,
                "user_name": userName,
                "dept_id": orgId,
                "os": os,
                "os_version": app_version,
                "resolution": resolution,
                "channel": channel
            }
        }]
    );
};

/**
 * Get value by name from cookie
 *
 * @param name - name of attribute in cookie
 * @returns {string} mapping value of attribute
 */
function getCookie(name){
    var data=document.cookie;
    var dataArray=data.split("; ");
    for(var i=0;i<dataArray.length;i++){
        var varName=dataArray[i].split("=");
        if(varName[0]==name){
            return varName[1];
        }

    }
};

/**
 * Set {name, value} to cookie
 *
 * @param name - name of attribute
 * @param value - mapping value of name
 */
function setCookie(name, value) {
    document.cookie = name + "="  + escape(value) + "; path=/";
}