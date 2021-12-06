var common = {
    valid : {
        isText : function(str, type) {
            str = str.replace(common.validTypeValue.TAG,"");
            if ((!type) || common.validTypeValue.isText[type[0]].test(str)) {
                return true;
            }
            return false;
        }
    },
    validTypeValue : {
        isText : {
            tag : /(<([^>]+)>)|\t/ig,
            kr : /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
            email : /^[-!#$%& amp;'*+./0-9=?A-Z^_a-z{|}~]+@[-!#$%&'*+/0-9=?A-Z^_a-z{|}~]+.[-!#$%& amp;'*+./0-9=?A-Z^_a-z{|}~]+$/,
            phone : /^01([0|1|6|7|8|9]?)?([0-9]{7,8})$/,
            phone_ : /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
            time : /^([01][0-9]|[2][0-3]):([0-5][0-9])$/,
            number : /^[0-9]+$/,
            id : /^[a-z0-9_]{4,20}$/,
            ps : /^[a-z0-9_]{4,20}$/,
            http: /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        }
    },

    validObject : {
        'WEBPAGES' : ['http', '웹 사이트 주소 형식으로 입력해주세요 ( 예 : https://www.xxxx.com/ )'],
        'PROJECT_EMAIL' : ['email', '이메일 형식으로 입력해주세요 ( 예 : xxxx@xxxxx.com )'],
        'TIME' : ['time', '시간을 정확하게 입력해주세요 ( 예 : 00:00 )'],
        'COMMUNITY_URL' : ['http', '웹 사이트 주소 형식으로 입력해주세요 ( 예 : https://www.xxxx.com/ )'],
        'PHONE_NUMBER' : ['phone', '전화번호를 정확하게 입력해주세요 ( 예 : 01000000000 )'],
        'EMAIL' : ['email', '이메일 형식으로 입력해주세요 ( 예 : xxxx@xxxxx.com )'],
        'PASSWORD' : ['ps', '비밀번호를 정확하게 입력해주세요 ( 영문 + 숫자 )']
    },

    formJson : {},
    popJson : {},

    popSetList: function() {
        let list = $("#popupFrom").find("input");
        let i = -1;
        while(list[(++i)]) {
            if (list[i].value) {
                if( list[i].type == "radio") {
                    if (list[i].checked) {
                        common.popJson[list[i].value] = list[i].id;
                    }
                } else if(list[i].type != "file") {
                    let vObject = common.validObject[list[i].id];
                    if (common.valid.isText(list[i].value, vObject)) {
                        common.popJson[list[i].id] = list[i].value;
                    } else {
                        alert(vObject[1]);
                        list[i].focus();
                        list[i].value = "";
                        return false;
                    }
                }
            } else {
                if (list[i].name) {
                    alert(list[i].name + "에 값을 넣어주세요");
                    list[i].focus();
                    return false;
                }
            }
        }

        return true;
    },

    popCleanList: function() {
        let list = $("#popupFrom").find("input");
        let i = -1
        while(list[(++i)]) {
            if( list[i].type == "radio") {
                list[i].checked = true;
            } else if(list[i].type != "file") {
                list[i].value = "";
                list[i].disabled = false;
            }
        }
    },

    formSetList: function() {
        let list = $("#from").find("input,textarea");
        let i = -1
        while(list[(++i)]) {
            if (list[i].value) {
                if(list[i].type != "file") {
                    let vObject = common.validObject[list[i].id];
                    if (common.valid.isText(list[i].value, vObject)) {
                        common.formJson[list[i].id] = list[i].value;
                    } else {
                        alert(vObject[1]);
                        list[i].focus();
                        list[i].value = "";
                        return false;
                    }
                }
            } else {
                if (list[i].name) {
                    alert(list[i].name + "에 값을 넣어주세요");
                    list[i].focus();
                    return false;
                }
            }
        }
         return true;
    },

    openPopup: function(title, btn, tf) {
        $("#popupSub").addClass("hidden");
        $("#popupManager").addClass("hidden");
        $("#popup").removeClass("hidden");

        if(tf) {
            common.onclickPopupButton = common.closePopup;
            $("#popupBtn").html("닫기");
            $("#popupTitle").html("프로필");
            $("#popupManager").removeClass("hidden");
        } else {
            $("#popupSub").removeClass("hidden");
            $("#popupBtn").html(btn);
            $("#popupTitle").html(title);
        }
    },

    closePopup: function() {
        $("#popup").addClass("hidden");
        common.popCleanList();
    },

    dateConverter: function(date, a, b, c) {
        var D = {};
        var A = "";
        var B = "";
        var C = " ";

        if (a) A=a;
        if (b) B=b;
        if (c) C=c;

        D.year = (date.getFullYear() + "").padStart(4,"0");
        D.month = ((date.getMonth() + 1) + "").padStart(2,"0");
        D.date = (date.getDate() + "").padStart(2,"0");
        D.hours = (date.getHours() + "").padStart(2,"0");
        D.minutes = (date.getMinutes() + "").padStart(2,"0");
        D.seconds = (date.getSeconds() + "").padStart(2,"0");
        D.YYYYMMDD = D.year + A + D.month + A + D.date;
        D.HHMI = D.hours + B + D.minutes;
        D.HHMISS = D.hours + B + D.minutes + B + D.seconds;
        D.YYYYMMDDHHMI = D.year + A + D.month + A + D.date + C + D.hours + B + D.minutes;
        D.YYYYMMDDHHMISS = D.year + A + D.month + A + D.date + C + D.hours + B + D.minutes + B + D.seconds;

        return D;
    },

    // 피커 적용
    picker: function() {
        $('#dates').daterangepicker({
            autoApply: true,
            locale: {
                  format: 'YYYY-MM-DD'
                }
        }, function(start, end) {
            common.pickerCallback(new Date(start), new Date(end));
        });
    },

    // 피커 적용 후 처리
    pickerCallback : function(start, end, label) {},

    // 데이터 입력 이벤트 처리
    ajax : function(url, data, callback, method) {
        var header = $("meta[name='_csrf_header']").attr('content');
        var token = $("meta[name='_csrf']").attr('content');
        if(!method){method = "POST"};
        $.ajax({
            url : url,
            method : method,
            beforeSend: function(xhr){
                    xhr.setRequestHeader(header, token);
            },
            data: "ajax="+JSON.stringify(data)
        }).done(function(json) {
            callback(json);
        })
    },

    // 게시판 페이지 이동
    moveHref : function(url) {
        location.href = url;
    },

    // 게시판 페이지 이동
    movePage : function(url, i) {
        common.searchSetPageNo(i);
        common.ajax(url, common.searchJson , function(data) {
            $("#pageList").replaceWith(data);
        })
    },

    nullCheck : function(str, value) {
        if (typeof str == "undefined" || str == null || str == "") {
            if (value) {
                return value;
            }
            return false;
        }
        return str;
    },

    searchJson : {
        name : "",
        startday : "",
        endday : "",
        order_by : "",
        type : "",
        page_no : 1,
    },

    searchSetJson : function(msg) {
        common.searchJson.name     = msg.name;
        common.searchJson.startday = msg.startday;
        common.searchJson.endday   = msg.endday;
        common.searchJson.order_by = msg.order_by;
        common.searchJson.type     = msg.type;
        common.searchJson.page_no  = msg.page_no;
    },

    searchSetName : function(name) { common.searchJson.name = name; },
    searchSetStartDay : function(startday) { common.searchJson.startday = startday; },
    searchSetEndDay : function(endday) { common.searchJson.endday   = endday; },
    searchSetOrderBy : function(orderBy) { common.searchJson.order_by = orderBy; },
    searchSetType : function(type) { common.searchJson.type = type; },
    searchSetPageNo : function(pageNo) { common.searchJson.page_no  = pageNo; },

    // 차트 생성
    chartMakerSet : function(labelList, dataList) {
        const data = {
          labels: labelList,
          datasets: [{
            barThickness: 25 ,
            label: '',
            data: dataList,
            backgroundColor: 'rgba(22, 114, 171, 0.6)'
          }]
        };

        let ctx = document.getElementById('myChart');

        common.myBarChart = new Chart(ctx, {
            type: 'bar',
            maintainAspectRatio: false,
            data: data,
            options: {
                plugins: {
                    title: {
                        display: false,
                    },
                    legend: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                    },
                }
            },
        });
    },
    // 차트 생성
    chartMakerUpDate : function(labelList, dataList) {
        common.myBarChart.data.datasets[0].data = dataList;
        common.myBarChart.data.labels = labelList;
        common.myBarChart.update();
    },
    onchange_image : function(e) {
        var image_type = e.value.split(".")
        image_type = image_type[image_type.length - 1];
        if (image_type == "jpg" || image_type == "png" || image_type == "svg" || image_type == "JPG" || image_type == "PNG" || image_type == "SVG") {
        //if (image_type == "svg" || image_type == "SVG") {
            let reader = new FileReader();
            reader.readAsDataURL(e.files[0]);
            reader.addEventListener("load", function () {
                common.formJson[e.id] = this.result;
            }, false);
            $("#IMAGE_NAME").val(e.value);
        } else {
           // alert("이미지 파일을 SVG, JPG, PNG 형식만 업로드 가능합니다.");
            alert("이미지 파일을 SVG 형식만 업로드 가능합니다.");
        }
    },
    selectHeader_callback: function(user) {
        if (user.authority != "ROLE_ADMIN") {
            $("#header_control").remove();
        }
        $("#home_name").html(user.name);
        $("#home_phoneNumber").html(user.phone_NUMBER);
        $("#home_email").html(user.email);
        $("#home_belong").html(user.belong);
    },
    setClassDate : [],
    setClassification: function(type) {
        var header = $("meta[name='_csrf_header']").attr('content');
        var token = $("meta[name='_csrf']").attr('content');
        if (!common.classificationJson) {
            $.ajax({ type: 'get' ,
                url: './json/classification.json?v=0.1' ,
                beforeSend: function(xhr){
                        xhr.setRequestHeader(header, token);
                },
                dataType : 'json' ,
                success: function(data) {
                    common.classificationJson = data;
                    common.classification_callback(type, data);
                    if(common.setClassDate.length > 1) {
                        if (common.setClassDate[0] === "이벤트") {
                            makeSelectSmallClassification('event', data);
                        } else {
                            makeSelectSmallClassification('news', data);
                        }
                        $("#SMALL_CLASSIFICATION").val(common.setClassDate[1]);
                    }
                }
            });
        } else {
            common.classification_callback(type, common.classificationJson);
        }
    },
    setStoreList: function(list) {
        if (list.length > 0) {
            list.forEach(function(val) {
                var json = {
                    'PROGRAMMING_LANGUAGE_NAME' : val.programming_LANGUAGE_NAME,
                    'PROGRAMMING_LANGUAGE_NUMBER' : val.programming_LANGUAGE_NUMBER,
                    'LICENSE_NAME' : val.license_NAME,
                    'LICENSE_NUMBER' : val.license_NUMBER,
                    'SOURCE_STORE' : val.source_STORE,
                    'code_STORE_NUMBER' : val.code_STORE_NUMBER
                };
                sourceJson.push(json);
            })
            insertSourceCode();
        }
    },

    setFormJson: function(type, number, imageNum, image) {
        common.formJson[type] = number;
        common.formJson[imageNum] = image;
    },

    EXECL_FROM : [
        ["project_NAME","프로젝트명"],
        ["summary","개요"],
        ["explanation","설명"],
        ["technical_FIELD_NAME","기술분야"],
        ["special_NEEDS","특이사항"],
        ["keyword","키워드"],
        ["webpages","웹페이지"],
        ["manager","담당자"],
        ["department_CHARGE","담당부서"],
        ["project_EMAIL","이메일"],
        ["image_NAME","이미지"],
        ["image_URL","이미지주소"],
        ["programming_LANGUAGE_NAME","언어"],
        ["license_NAME","라이선스"],
        ["source_STORE","URL"],
        ["creation_DATE","생성일자"]
    ],

    makeProjectExecl : function() {
        common.excelData = [];
        var header = $("meta[name='_csrf_header']").attr('content');
        var token = $("meta[name='_csrf']").attr('content');
        $.ajax({
            url : "/project/makeProjectExecl",
            beforeSend: function(xhr){
                    xhr.setRequestHeader(header, token);
            },
            method : "POST",
            data: "date="
        }).done(function(list) {
            if(list !== null || list.length > 0) {
                var headerList = [];
                common.EXECL_FROM.forEach(function(li) {
                    headerList.push(li[1]);
                })
                common.excelData.push(headerList);
                list.forEach(function(json) {
                    let valueList = [];
                    common.EXECL_FROM.forEach(function(data) {
                        valueList.push(json[data[0]]);
                    })
                    common.excelData.push(valueList);
                })
                exportExcel();
            }
        })
    },

    onclick_hiddenMenu : function(id) {
        if($("#"+id).hasClass("hidden")) {
            $("#"+id).removeClass("hidden");
        } else {
            $("#"+id).addClass("hidden");
        }
    },

    timeSetVal : 0,
    timeSetFunction : function(num) {
        common.timeSetVal = 1
        let settime  = setTimeout(function() {
            common.timeSetVal = 0;
            clearTimeout(settime);
        }, 100 * num)
    },
    onMouseDown : function(id) {
        $(document).mousedown(function( e ){
            if( !$("#"+id).hasClass("hidden") ) {
           	    $("#"+id).each(function(){
           	    	var l_position = $(this).offset();
           	    	l_position.right = parseInt(l_position.left) + ($(this).width());
           	    	l_position.bottom = parseInt(l_position.top) + parseInt($(this).height());

           	    	if( ( l_position.left <= e.pageX && e.pageX <= l_position.right )
           	    		&& ( l_position.top <= e.pageY && e.pageY <= l_position.bottom ) ) {
           	    	} else {
           	    		$("#"+id).addClass("hidden");
           	    	}
           	    });
            }
        });
    },

    excelData : [],
    classificationJson: false,
    classification_callback: function() {},
    onclickPopupButton : function () {},
    hiddenManu : function() {}
}

$(function() {
  common.ajax("/home/selectHeader", {}, common.selectHeader_callback);
  common.onMouseDown("headerList");
})

var onclick_headerMenu = function() {
    var cl = $("#headerList");
    if(cl.hasClass("hidden")) {
        cl.removeClass("hidden");
    } else {
        cl.addClass("hidden");
    }
}

var exportExcel = function(){
    // step 1. workbook 생성
    var wb = XLSX.utils.book_new();

    // step 2. 시트 만들기
    var newWorksheet = excelHandler.getWorksheet();

    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
    XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

    // step 4. 엑셀 파일 만들기
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    // step 5. 엑셀 파일 내보내기
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
}

var excelHandler = {
		getExcelFileName : function(){
		    return 'project.xlsx';
		},
		getSheetName : function(){
			return 'project';
		},
		getExcelData : function(){
			return common.excelData;
		},
		getWorksheet : function(){
			return XLSX.utils.aoa_to_sheet(this.getExcelData());
		}
}

var s2ab = function(s){
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}