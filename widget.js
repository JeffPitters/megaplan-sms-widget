<style>
.nalogtelecom-sms-send {
    background-color: transparent !important;
    border: none !important;
    outline: none !important;
    cursor: pointer !important;
}

.nalogtelecom-sms-form {
    margin-top: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #c2c2c2;
    backround-color: "#ffffff";
}

.nalogtelecom-sms-title {
    font-family: Roboto;
    font-size: 18px;
    color: #191919;
}
</style>

<script>
//Отправка текста
async function sendSms(){
    let textContainer = document.querySelector('div[data-field = "Comment.content"]');
    if(textContainer.textContent!=='Отправить сообщение'){
        let phone = document.querySelector('.nalogtelecom-sms-form > select').selectedOptions[0].value;
        let body = {
            phone: phone,
            text: textContainer.textContent
        };
        let init = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Origin': 'https://nalogtelecom1.megaplan.ru',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            cache: "no-cache"
        };
        fetch('https://technosham.ru/sms-handler', init)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return new Promise.reject('Ошибка при получении ответа сервера');
                }
            })
            .then( data => console.log(data),
                reason => console.log(reason)
            );
    }
}

//Получение данных о клиенте, в карточке которого мы находимся
async function getContractor(){
    return new Promise(function(resolve, reject) {
        //Унылым методом пытаемся определить id клиента открытой карточки
        let reg = /(crm\/)[0-9]+(\/card)/g;
        let reg_num = /[0-9]+/g;
        let id = document.URL.match(reg)[0].match(reg_num)[0];

        if(id){
            resolve(id);
        } else {
            reject('ID клиента не удалось определить по урлу');
        }
    })
        .then(id => { return fetch('/api/v3/contractor/'+id) })
        .then(response => { return response.json() },
            error => { return new Promise.reject('Не удаётся достучаться до API мегаплана') })
        .then(resp => { return resp.data })
        .catch(reason => { return reason });
}

//Открытие/закрытие формы отправки смс
function open_form(){
    let svg = document.querySelector('.nalogtelecom-sms-send > svg');
    let form = document.querySelector('.nalogtelecom-sms-form');
    //если форму открываем
    if (svg.getAttribute("fill") === "#65687e") {
        svg.setAttribute("fill", "#08bf32");
        form.setAttribute("style", "display: block");
    }
    //если форму закрываем 
    else {
        svg.setAttribute("fill", "#65687e");
        form.setAttribute("style", "display: none");
    }
}

//Добавляем на элемент svg иконку смс
function create_icon(element){
    let my_svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
    my_svg.setAttribute("width", 17);
    my_svg.setAttribute("height", 17);
    my_svg.setAttribute("fill", "#65687e");
    my_svg.setAttribute("x", "0px");
    my_svg.setAttribute("y", "0px");
    my_svg.setAttribute("viewBox", "0 0 78.666 78.666");
    let line_one = document.createElementNS('http://www.w3.org/2000/svg', "path");
    line_one.setAttribute("d", "M9.49,73.833c-1.494,0-2.943-0.24-4.31-0.713l-3.113-1.077l2.392-2.265c3.166-2.998,3.965-6.456,4.017-9.046 C3.004,54.665,0,47.096,0,39.333c-0.001-19.023,17.644-34.5,39.332-34.5s39.334,15.477,39.334,34.5 c0,19.022-17.646,34.498-39.334,34.498c-6.457,0-12.827-1.399-18.504-4.057C18.689,71.289,14.368,73.833,9.49,73.833z M20.359,65.078l1.148,0.581c5.397,2.729,11.561,4.173,17.824,4.173c19.483,0,35.334-13.682,35.334-30.498 c0-16.818-15.851-30.5-35.334-30.5S3.998,22.516,3.998,39.333c0,6.989,2.814,13.822,7.925,19.239l0.52,0.551l0.024,0.757 c0.088,2.719-0.4,6.406-2.817,9.951c4.632-0.074,8.89-3.298,9.704-3.949L20.359,65.078z");
    my_svg.append(line_one);
    let line_two = document.createElementNS('http://www.w3.org/2000/svg', "path");
    line_two.setAttribute("d", "M20.254,48.769c-1.467,0-2.658-0.115-3.578-0.346c-0.918-0.229-1.553-0.465-1.902-0.705 c-0.088-0.088-0.121-0.289-0.1-0.607c0.021-0.315,0.071-0.645,0.148-0.983c0.076-0.338,0.175-0.642,0.295-0.901 c0.12-0.262,0.234-0.384,0.345-0.361c0.569,0.197,1.187,0.389,1.854,0.574s1.515,0.278,2.543,0.278  c1.051,0,1.941-0.151,2.676-0.459c0.732-0.307,1.1-0.854,1.1-1.641c0-0.681-0.242-1.232-0.723-1.658s-1.346-0.881-2.593-1.36 c-0.679-0.265-1.318-0.554-1.92-0.872c-0.603-0.316-1.132-0.689-1.592-1.116c-0.46-0.426-0.82-0.935-1.083-1.525 c-0.263-0.59-0.395-1.291-0.395-2.101c0-0.656,0.127-1.28,0.378-1.871s0.64-1.1,1.165-1.526c0.525-0.426,1.198-0.766,2.019-1.017 c0.821-0.252,1.8-0.378,2.938-0.378c0.743,0,1.362,0.017,1.854,0.049c0.492,0.033,0.896,0.077,1.215,0.132 c0.316,0.055,0.574,0.115,0.771,0.181c0.197,0.066,0.383,0.12,0.558,0.164c0.153,0.065,0.23,0.257,0.23,0.574 s-0.045,0.656-0.132,1.018c-0.087,0.36-0.208,0.678-0.36,0.951c-0.154,0.274-0.307,0.389-0.46,0.345  c-0.372-0.109-0.881-0.229-1.526-0.36c-0.646-0.132-1.274-0.197-1.887-0.197c-1.248,0-2.106,0.176-2.576,0.525 c-0.471,0.35-0.706,0.82-0.706,1.411c0,0.635,0.263,1.144,0.788,1.526c0.525,0.382,1.346,0.771,2.461,1.165 c1.772,0.7,3.08,1.504,3.922,2.412c0.842,0.908,1.264,2.051,1.264,3.43c0,1.029-0.197,1.883-0.59,2.562  c-0.395,0.678-0.92,1.215-1.576,1.606c-0.656,0.396-1.406,0.674-2.248,0.838C21.988,48.687,21.129,48.769,20.254,48.769z");
    my_svg.append(line_two);
    let line_three = document.createElementNS('http://www.w3.org/2000/svg', "path");
    line_three.setAttribute("d", "M43.917,48.605c-0.459,0-0.76-0.076-0.901-0.23c-0.144-0.152-0.213-0.447-0.213-0.887V36.001 c-0.875,1.422-1.55,2.521-2.021,3.298c-0.472,0.778-0.813,1.347-1.033,1.708c-0.219,0.359-0.351,0.574-0.396,0.639 c-0.043,0.066-0.063,0.111-0.063,0.133c-0.196,0.328-0.334,0.541-0.41,0.64c-0.078,0.101-0.237,0.147-0.477,0.147h-0.525 c-0.284,0-0.471-0.049-0.558-0.147c-0.087-0.099-0.219-0.312-0.394-0.64l-3.348-5.71v11.619c0,0.285-0.049,0.51-0.148,0.674 c-0.098,0.164-0.355,0.246-0.771,0.246h-1.377c-0.307,0-0.574-0.049-0.805-0.148c-0.229-0.098-0.345-0.42-0.345-0.969V31.736 c0-0.438,0.082-0.728,0.246-0.87c0.164-0.142,0.399-0.213,0.706-0.213h1.641c0.24,0,0.443,0.032,0.607,0.098 s0.333,0.23,0.509,0.492l4.364,6.958l4.365-6.892c0.132-0.241,0.289-0.41,0.478-0.509c0.187-0.099,0.365-0.147,0.541-0.147h1.806 c0.416,0,0.655,0.087,0.723,0.262c0.066,0.176,0.098,0.46,0.098,0.854v15.883c0,0.328-0.043,0.57-0.131,0.724 s-0.34,0.229-0.754,0.229H43.917L43.917,48.605z");
    my_svg.append(line_three);
    let line_four = document.createElementNS('http://www.w3.org/2000/svg', "path");
    line_four.setAttribute("d", "M54.848,48.769c-1.468,0-2.658-0.115-3.578-0.346c-0.918-0.229-1.554-0.465-1.902-0.705 c-0.088-0.088-0.121-0.289-0.1-0.607c0.021-0.315,0.069-0.645,0.147-0.983c0.076-0.338,0.174-0.642,0.295-0.901 c0.119-0.263,0.233-0.384,0.345-0.361c0.569,0.197,1.188,0.389,1.854,0.574c0.666,0.186,1.514,0.278,2.543,0.278 c1.051,0,1.94-0.151,2.676-0.459c0.731-0.307,1.101-0.854,1.101-1.641c0-0.681-0.242-1.232-0.724-1.658s-1.346-0.881-2.594-1.36 c-0.679-0.265-1.317-0.554-1.92-0.872c-0.603-0.316-1.132-0.689-1.593-1.116c-0.459-0.426-0.819-0.935-1.082-1.525 c-0.264-0.591-0.395-1.291-0.395-2.101c0-0.656,0.127-1.28,0.377-1.871c0.252-0.591,0.641-1.1,1.166-1.526 c0.525-0.426,1.197-0.766,2.018-1.017c0.822-0.252,1.802-0.378,2.938-0.378c0.744,0,1.363,0.017,1.854,0.049 c0.492,0.033,0.896,0.077,1.216,0.132c0.315,0.055,0.573,0.115,0.771,0.181c0.196,0.065,0.383,0.12,0.559,0.164 c0.152,0.065,0.229,0.257,0.229,0.574s-0.045,0.656-0.133,1.018c-0.086,0.36-0.207,0.678-0.358,0.951 c-0.154,0.274-0.308,0.389-0.461,0.345c-0.371-0.109-0.882-0.229-1.525-0.36c-0.646-0.132-1.275-0.197-1.887-0.197 c-1.248,0-2.107,0.176-2.576,0.525c-0.471,0.35-0.707,0.82-0.707,1.411c0,0.635,0.264,1.144,0.789,1.526 c0.524,0.382,1.346,0.771,2.461,1.165c1.771,0.7,3.08,1.504,3.922,2.412c0.842,0.908,1.264,2.051,1.264,3.43 c0,1.029-0.197,1.883-0.59,2.562c-0.395,0.678-0.92,1.215-1.576,1.606c-0.656,0.396-1.406,0.674-2.248,0.838 C56.579,48.687,55.723,48.769,54.848,48.769z");
    my_svg.append(line_four);
    element.append(my_svg);
}

//Составляем форму для отправки смс
function create_form(){
    let my_form = document.createElement("div");
    my_form.className = "nalogtelecom-sms-form";
    let title = document.createElement('div');
    let title_span = document.createElement("span");
    title_span.textContent = 'Отправка СМС';
    title_span.className = "nalogtelecom-sms-title";
    title.append(title_span);
    my_form.append(title);
    my_form.setAttribute("style", "display: none");
    return my_form;
}

//Добавляем на форму список номеров телефонов
async function append_phones(form){
    let sel = document.createElement("select");
    let send_button = document.createElement("button");
    let button_word = document.createElement("span");
    button_word.textContent = "Отправить";
    send_button.append(button_word);
    send_button.addEventListener('click', sendSms);

    getContractor()
        .then(resp => {
            let phones = resp.contactInfo.filter(element => {
                return element.type === "phone";
            });

            if(phones.length){
                phones.forEach( element => {
                    let opt = new Option(element.value, element.value);
                    sel.append(opt);
                });
                form.append(sel);
                form.append(send_button);
                return new Promise.resolve();
            } else {
                return new Promise.reject('У клиента не указаны телефоны');
            }
        })
        .catch( reason => { return new Promise.reject(reason) });
}

//Первое, что вызовем из виджета
function init() {
    let mail_button = document.querySelector('button[data-name="sendEmail"]');

    let my_button = document.createElement("button");
    my_button.className = "nalogtelecom-sms-send";
    my_button.addEventListener("click", open_form);
    create_icon(my_button);
    let my_form = create_form();
    append_phones(my_form)
        .then( () => {
            mail_button.parentElement.after(my_form);
            mail_button.after(my_button);
        });
}

let isSmspilotInit = false;
let isSendFormActive = false;
//Точка входа
a9n.user().then( current_user => {
    if (!isSmspilotInit) {
        isSmspilotInit = true;
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setTimeout(init, 0));
        } else {
            setTimeout(init, 0);
        }
    }
});
</script>

