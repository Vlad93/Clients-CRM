(() => {
  // создаем и возвращаем заголовок приложения
  function createAppTitle() {
    const appTitle = document.createElement('h1');
    appTitle.classList.add('app-title');
    appTitle.innerHTML = "Клиенты";
    return appTitle;
  }

  // функция для создания поля формы с инпутом и лэйблом
  function createFormField() {
    const inputWrap = document.createElement('div');
    const inputlabel = document.createElement('label');
    const input = document.createElement('input');

    inputWrap.classList.add('client-form__input-wrap', 'input-wrap');
    inputlabel.classList.add('client-form__label', 'label');
    input.classList.add('client-form__input', 'input');
    input.setAttribute('type', 'text');
    inputWrap.append(inputlabel);
    inputWrap.append(input);

    input.addEventListener('focus', () => {
      inputlabel.classList.add('top');
    });
    input.addEventListener('blur', () => {
      if(input.value === '') {
        inputlabel.classList.remove('top');
      }
    });

    return {
      inputWrap,
      inputlabel,
      input,
    }
  }

  // Функция создания статичных элементов таблицы
  function createClientsTable() {
    const table = document.createElement('table');
    const tableHeaderWrap = document.createElement('thead');
    const tableBody = document.createElement('tbody');
    const tablePreloader = document.createElement('div');
    const tablePreloaderSpinner = document.createElement('div');
    tablePreloader.classList.add('table__preloader');
    tablePreloaderSpinner.classList.add('table__preloader-spinner');
    tablePreloader.append(tablePreloaderSpinner);
    tableBody.append(tablePreloader);
    const tableHeadersArr = [];
    for (let i = 0; i <= 5; i++) {
      const tableHead = document.createElement('th');
      tableHead.classList.add('clients-table__head');
      tableHeadersArr.push(tableHead);
      tableHeaderWrap.append(tableHead);
    }
    table.classList.add('table', 'clients-table');
    tableHeaderWrap.classList.add('clients-table__header');
    tableBody.classList.add('clients-table__body');
    tableHeadersArr[0].innerHTML = "ID <svg class='clients-table__head-icon'><use xlink:href='#arrow-up'></use></svg>";
    tableHeadersArr[0].id = 'id';
    tableHeadersArr[0].classList.add('sortable', 'sort');
    tableHeadersArr[1].innerHTML = "Фамилия Имя Отчество <span class='clients-table__head-icon-text'><svg class='clients-table__head-icon'><use xlink:href='#arrow-up'></use></svg> А-Я</span>";
    tableHeadersArr[1].id = 'fullname';
    tableHeadersArr[1].classList.add('sortable');
    tableHeadersArr[2].innerHTML = "Дата и время создания <svg class='clients-table__head-icon'><use xlink:href='#arrow-up'></use></svg>";
    tableHeadersArr[2].id = 'createdAt';
    tableHeadersArr[2].classList.add('sortable');
    tableHeadersArr[3].innerHTML = "Последние изменения <svg class='clients-table__head-icon'><use xlink:href='#arrow-up'></use></svg>";
    tableHeadersArr[3].id = 'updatedAt';
    tableHeadersArr[3].classList.add('sortable');
    tableHeadersArr[4].innerHTML = 'Контакты';
    tableHeadersArr[4].id = 'contacts';
    tableHeadersArr[5].innerHTML = 'Действия';
    tableHeadersArr[5].id = 'actions';

    table.append(tableHeaderWrap, tableBody);
    return {
      table,
      tableBody,
    };
  }

  // Функция создания инпута дял добавления контакта
  function createContactsInput() {
    const contactInputWrap = document.createElement('div');
    const contactTypeWrap = document.createElement('select');
    const contactTypePhone = document.createElement('option');
    const contactTypeEmail = document.createElement('option');
    const contactTypeVk = document.createElement('option');
    const contactTypeFb = document.createElement('option');
    const contactTypeOther = document.createElement('option');
    const contactValueInput = document.createElement('input');
    const deleteContact = document.createElement('button');

    contactInputWrap.classList.add('client-form__contact-wrap');
    contactTypeWrap.classList.add('client-form__select', 'contact-select');
    contactTypeWrap.setAttribute('name', 'type');
    contactTypePhone.setAttribute('value', 'Телефон');
    contactTypePhone.setAttribute('selected', true);
    contactTypePhone.textContent = 'Телефон';
    contactTypeEmail.setAttribute('value', 'Email');
    contactTypeEmail.textContent = 'Email';
    contactTypeVk.setAttribute('value', 'Vk');
    contactTypeVk.textContent = 'Vk';
    contactTypeFb.setAttribute('value', 'Facebook');
    contactTypeFb.textContent = 'Facebook';
    contactTypeOther.setAttribute('value', 'Другое');
    contactTypeOther.textContent = 'Другое';
    deleteContact.classList.add('client-form__delete-contact-btn', 'delete-contact-btn');
    deleteContact.setAttribute('type', 'button');
    deleteContact.innerHTML = "<svg class='delete-contact-btn__icon'><use xlink:href='#add'></use></svg>";
    deleteContact.style.display = 'none';
    tippy(deleteContact, {
      theme: 'custom',
      content: 'Удалить контакт',
      trigger: 'mouseenter',
      duration: [500, 250],
    });

    contactValueInput.classList.add('client-form__input','input', 'client-form__contact-input');
    contactValueInput.setAttribute('type', 'text');
    contactValueInput.placeholder = 'Введите данные контакта';

    contactValueInput.addEventListener('input', () => {
      if(contactValueInput.value !== '') {
        deleteContact.style.display = 'block';
      }
    });

    deleteContact.addEventListener('click', () => {
      contactInputWrap.remove();
    });

    contactTypeWrap.append(contactTypePhone, contactTypeEmail,  contactTypeVk,  contactTypeFb, contactTypeOther);
    contactInputWrap.append(contactTypeWrap, contactValueInput, deleteContact);

    return {
      contactInputWrap,
      contactTypeWrap,
      contactValueInput,
      deleteContact,
    };
  }

  // фунцкия очистки формы
  function resetForm(form) {
    form.querySelectorAll('input').forEach(input => {
      input.value = '';
    });
    const contacts = form.querySelectorAll('.client-form__contact-wrap');
    if (contacts) {
      contacts.forEach(contact => {
        contact.remove();
      })
    }
    const validateErrors = form.querySelector('.client-form-errors');
    if (validateErrors) {
      validateErrors.remove();
      form.querySelectorAll('.border-danger').forEach(input => {
        input.classList.remove('border-danger');
      });
    }
    const serverErrors = form.querySelectorAll('.client-form__server-err');
    if (serverErrors) {
      serverErrors.forEach((error) => {
        error.remove();
      });
    }
    form.querySelectorAll('.client-form__input ').forEach((input) => {
      input.removeAttribute('disabled');
    });
  }

  // Функция для создания модального окна
  function createModalWindow(content) {
    const modalWindow = document.createElement('div');
    const modalOverlay = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalCloseBtn = document.createElement('button');

    modalWindow.classList.add('modal');
    modalOverlay.classList.add('modal__overlay');
    modalContent.classList.add('modal__content');
    modalCloseBtn.classList.add('modal__close-btn');

    modalCloseBtn.innerHTML = "<svg class='modal__close-btn-icon'><use xlink:href='#close'></use></svg>";

    modalContent.append(content, modalCloseBtn);
    modalWindow.append(modalOverlay,modalContent);

    document.body.addEventListener('click', (evt) => {
      if((evt.target.closest('.modal__close-btn') === modalCloseBtn || evt.target === modalOverlay) && modalWindow.classList.contains('show')) {
        modalWindow.classList.remove('show');
        const modalForm = modalWindow.querySelector('form');
        if (modalForm) {
          resetForm(modalForm);
        }
        if (window.location.hash) {
          const url = window.location.href;
          history.pushState({},'', url.split('#')[0]);
        }
      }
    });
    return modalWindow;
  }

  // Функция получения клиентов из базы данных
  async function getClients() {
    const tablePreloader = document.querySelector('.table__preloader');
    tablePreloader.classList.add('show');
    const response = fetch('http://localhost:3000/api/clients')
      .then(async res => {
        if(res.ok) {
          const clientsList = await res.json();
          tablePreloader.classList.remove('show');
          return clientsList;
        }
      })
      .catch(err => {
        tablePreloader.classList.remove('show');
        if(err) {
          alert(err);
        } else {
          alert('Что-то пошло не так...');
        }
      })
    return response;
  }

  // Функция создания строки с информацией о клиенте
  function createClientElement(clientObj) {
    // создаем элемент
    const tr = document.createElement('tr');
    tr.classList.add('clients-table__client-row');
    tr.setAttribute('id', `${clientObj.id}`);
    // Колонка id
    const id = clientObj.id;
    // Колонка полное имя
    const fullname = `${clientObj.surname} ${clientObj.name} ${clientObj.lastName}`;
    // Колонки создания и изменения
    const createdAt = new Date(Date.parse(clientObj.createdAt));
    const updatedAt = new Date(Date.parse(clientObj.updatedAt));
    function formatDate(date) {
      let dd = date.getDate();
      if (dd < 10) dd = '0' + dd;

      let mm = date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;

      let yy = date.getFullYear();

      return `${dd}.${mm}.${yy}`;
    }
    function formatTime(date) {
      let hh = date.getHours();
      if (hh < 10) hh = '0' + hh;

      let mm = date.getMinutes();
      if (mm < 10) mm = '0' + mm;

      let yy = date.getFullYear();

      return `${hh}:${mm}`;
    }
    const createdDate = formatDate(createdAt);
    const createdTime = formatTime(createdAt);
    const updatedDate = formatDate(updatedAt);
    const updatedTime = formatTime(updatedAt);
    // Контакты
    const contactsCol = document.createElement('td');
    contactsCol.classList.add('clients-table__col', 'clients-table__col-contacts');
    const contactsList = document.createElement('ul');
    contactsList.classList.add('clients-table__contacts-list', 'contacts-list');
    for (let i = 0; i < clientObj.contacts.length; i++) {
      const contactsListItem = document.createElement('li');
      contactsListItem.classList.add('contacts-list__item');
      const contactsListLink = document.createElement('a');
      contactsListLink.classList.add('contacts-list__link');
      switch(clientObj.contacts[i].type) {
        case 'Телефон' :
          contactsListLink.innerHTML = "<svg class='contacts-list__link-icon contacts-list__link-icon-phone'><use xlink:href='#phone'></use></svg>";
          contactsListLink.setAttribute('href', `tel:${clientObj.contacts[i].value}`);
          tippy(contactsListLink, {
            theme: 'custom',
            content: `Телефон: ${clientObj.contacts[i].value}`,
            trigger: 'mouseenter',
            duration: [500, 250],
          });
          break;
        case 'Email' :
          contactsListLink.innerHTML = "<svg class='contacts-list__link-icon'><use xlink:href='#email'></use></svg>";
          contactsListLink.setAttribute('href', `mailto:${clientObj.contacts[i].value}`);
          tippy(contactsListLink, {
            theme: 'custom',
            content: `E-mail: ${clientObj.contacts[i].value}`,
            trigger: 'mouseenter',
            duration: [500, 250],
          });
          break;
        case 'Facebook' :
          contactsListLink.innerHTML = "<svg class='contacts-list__link-icon'><use xlink:href='#fb'></use></svg>";
          contactsListLink.setAttribute('href', `${clientObj.contacts[i].value}`);
          contactsListLink.setAttribute('target', '_blank');
          tippy(contactsListLink, {
            theme: 'custom',
            content: `Facebook: ${clientObj.contacts[i].value}`,
            trigger: 'mouseenter',
            duration: [500, 250],
          });
          break;
        case 'Vk' :
          contactsListLink.innerHTML = "<svg class='contacts-list__link-icon'><use xlink:href='#vk'></use></svg>";
          contactsListLink.setAttribute('href', `${clientObj.contacts[i].value}`);
          contactsListLink.setAttribute('target', '_blank');
          tippy(contactsListLink, {
            theme: 'custom',
            content: `Vk: ${clientObj.contacts[i].value}`,
            trigger: 'mouseenter',
            duration: [500, 250],
          });
          break;
        default :
          contactsListLink.innerHTML = "<svg class='contacts-list__link-icon'><use xlink:href='#contact'></use></svg>";
          contactsListLink.setAttribute('href', `${clientObj.contacts[i].value}`);
          contactsListLink.setAttribute('target', '_blank');
          tippy(contactsListLink, {
            theme: 'custom',
            content: `${clientObj.contacts[i].value}`,
            trigger: 'mouseenter',
            duration: [500, 250],
          });
          break;
      }
      contactsListItem.append(contactsListLink);
      contactsList.append(contactsListItem);
      if (clientObj.contacts.length >= 5 && i === 3) {
        let pasteCountContacts = clientObj.contacts.length - 4;
        const contactsListItem = document.createElement('li');
        contactsListItem.classList.add('contacts-list__item');
        const showMoreContactsBtn = document.createElement('button');
        showMoreContactsBtn.classList.add('contacts-list__link', 'contacts-list__show-more-btn');
        showMoreContactsBtn.innerHTML = `+${pasteCountContacts}`;
        showMoreContactsBtn.addEventListener('click', () => {
          document.querySelectorAll('.contacts-list__item.hidden').forEach(el => {
            el.classList.remove('hidden');
          });
          showMoreContactsBtn.parentNode.classList.add('hidden');
        });
        contactsListItem.append(showMoreContactsBtn);
        contactsList.append(contactsListItem);
      } else if (clientObj.contacts.length >= 5 && i > 3) {
        contactsListItem.classList.add('hidden');
      };
    };
    contactsCol.append(contactsList);
    // Кнопки изменения и удаления
    const actionsCol = document.createElement('td');
    actionsCol.classList.add('clients-table__col', 'clients-table__col-actions');
    const changeClientBtn = document.createElement('button');
    changeClientBtn.classList.add('clients-table__change-btn');
    changeClientBtn.innerHTML = `<span class="clients-table__change-btn-preloader hide"></span><svg class='clients-table__change-btn-icon'><use xlink:href='#edit'></use></svg>Изменить`;
    actionsCol.append(changeClientBtn);
    const deleteClientBtn = document.createElement('button');
    deleteClientBtn.classList.add('clients-table__delete-btn');
    deleteClientBtn.innerHTML = "<span class='clients-table__delete-btn-preloader hide'></span><svg class='clients-table__delete-btn-icon'><use xlink:href='#add'></use></svg>Удалить";
    const actionsBtnsWrap = document.createElement('div');
    actionsBtnsWrap.classList.add('clients-table__actions-btns-wrap');
    actionsBtnsWrap.append(changeClientBtn, deleteClientBtn);
    actionsCol.append(actionsBtnsWrap);
    tr.innerHTML = `<td class="clients-table__col clients-table__col-id">${id}</td>
                    <td class="clients-table__col clients-table__col-fullname">${fullname}</td>
                    <td class="clients-table__col clients-table__col-created">${createdDate}<span class="clients-table__time">${createdTime}</span></td>
                    <td class="clients-table__col clients-table__col-updated">${updatedDate}<span class="clients-table__time">${updatedTime}</span></td>`;
    tr.append(contactsCol, actionsCol);
    return tr;
  }

  // функция создания формы для добавления клиента
  // на ее основе будем создавать модальное окно с формой нового клиента либо форму изменения существующего
  function createAddClientForm() {
    const form = document.createElement('form');
    const formTitle = document.createElement('h2');
    const formTitleWrap = document.createElement('div');
    const surnameField = createFormField();
    const nameField = createFormField();
    const lastnameField = createFormField();
    const contactsWrap = document.createElement('div');
    const btnAddContact = document.createElement('button');
    const btnSave = document.createElement('button');

    // Добавляем классы css и текст для элементов формы
    form.classList.add('client-form');
    formTitleWrap.classList.add('client-form__title-wrap')
    formTitle.classList.add('client-form__title');
    contactsWrap.classList.add('client-form__contacts-wrap')
    btnAddContact.classList.add('client-form__add-contact', 'add-contact-btn');
    btnSave.classList.add('client-form__btn', 'btn');

    surnameField.input.id = "surname";
    surnameField.input.setAttribute('name', 'surname');
    surnameField.inputlabel.setAttribute('for', 'surname');
    surnameField.inputlabel.innerHTML = "Фамилия<span>*</span>"
    nameField.input.id = "name";
    nameField.input.setAttribute('name', 'name');
    nameField.inputlabel.setAttribute('for', 'name');
    nameField.inputlabel.innerHTML = "Имя<span>*</span>"
    lastnameField.input.id = "lastname";
    lastnameField.input.setAttribute('name', 'lastname');
    lastnameField.inputlabel.setAttribute('for', 'lastname');
    lastnameField.inputlabel.innerHTML = "Отчество";
    btnAddContact.setAttribute('type', 'button');
    btnSave.setAttribute('type', 'submit');

    btnAddContact.innerHTML = "<svg class='add-contact-btn__icon'><use xlink:href='#add'></use></svg> Добавить контакт"
    btnSave.textContent = 'Сохранить';

    // Размещаем элементы в форме
    formTitleWrap.append(formTitle);
    contactsWrap.append(btnAddContact);
    form.append(formTitleWrap, surnameField.inputWrap, nameField.inputWrap, lastnameField.inputWrap, contactsWrap, btnSave);


    btnAddContact.addEventListener('click', () => {
      const contactInputObj = createContactsInput();
      contactsWrap.prepend(contactInputObj.contactInputWrap);
      if (contactsWrap.querySelectorAll('.client-form__contact-wrap').length === 10) {
        btnAddContact.style.display = "none";
      }
      let choicesContactType = new Choices(contactInputObj.contactTypeWrap, {
        silent: true,
        searchEnabled: false,
        itemSelectText: '',
        duplicateItemsAllowed: false
      });
    });

    // Возвращаем форму, инпут и кнопку, чтобы к ним был доступ
    return {
      form,
      formTitleWrap,
      formTitle,
      surnameField,
      nameField,
      lastnameField,
      contactsWrap,
      btnAddContact,
      btnSave,
    };
  }

  // Валидация формы
  function validate(formObj, validateInputs) {
    const errorList = document.createElement('ul');
    errorList.classList.add('client-form-errors');

    validateInputs.forEach((input) => {
      if (input.value.trim() === '') {
        input.classList.add('border-danger');
        const errorEl = document.createElement('li');
        errorEl.classList.add('client-form-errors__item', 'text-danger');
        const inputId = input.id;
        let inputName = '';
        if (inputId) {
          inputId === 'name' ? inputName = 'Имя' : inputName = 'Фамилия';
          errorEl.innerHTML = `Поле "${inputName}" обязательно для заполнения.`;
        } else {
          errorEl.innerHTML = 'Все поля контактов должны быть заполнены.';
        }

        errorList.append(errorEl);
      } else {
        input.classList.remove('border-danger');
        input.classList.add('border-success');
      }
      input.addEventListener('input', () => {
        if (input.classList.contains('border-danger')) {
          input.classList.remove('border-danger');
        }
      })
    });

    if (errorList.children.length > 0) {
      if (document.querySelector('.client-form-errors')) {
        document.querySelector('.client-form-errors').replaceWith(errorList);
      } else {
        formObj.contactsWrap.after(errorList);
      }
      return errorList;
    }
    return errorList;
  }

  // Функция заполнения полей формы изменения данных клиента
  function fillChangeForm(formObj, clientObj) {
    // вспомогательная функция для стилизации плэйсхолдеров
    function addClassTop(value, label) {
      if(value !== '') {
        label.classList.add('top');
      }
    }
    formObj.nameField.input.value = clientObj.name;
    addClassTop(clientObj.name, formObj.nameField.inputlabel);
    formObj.surnameField.input.value = clientObj.surname;
    addClassTop(clientObj.surname, formObj.surnameField.inputlabel);
    formObj.lastnameField.input.value = clientObj.lastName;
    addClassTop(clientObj.lastName, formObj.lastnameField.inputlabel);
    formObj.form.querySelector('.client-form__id').innerHTML = `ID: ${clientObj.id}`;
    if (clientObj.contacts.length > 0) {
      clientObj.contacts.forEach(contact => {
        const contactInputObj = createContactsInput();
        contactInputObj.contactTypeWrap.childNodes.forEach(option => {
          if (option.value === contact.type)
            option.setAttribute('selected', true);
        });
        contactInputObj.contactValueInput.value = contact.value;
        contactInputObj.deleteContact.style.display = 'block';
        formObj.contactsWrap.prepend(contactInputObj.contactInputWrap);
        let choicesContactType = new Choices(contactInputObj.contactTypeWrap, {
          silent: true,
          searchEnabled: false,
          itemSelectText: '',
          duplicateItemsAllowed: false
        });
      });
    } else if (clientObj.contacts.length === 10) {
      formObj.btnAddContact.display = 'none';
    }
  }

  // Функция сбора данных из формы формы
  function getFormData(formObj) {
    let validateInputs = [];
    validateInputs = [...Array.from(formObj.form.querySelectorAll('.client-form__contact-input')), formObj.surnameField.input, formObj.nameField.input];
    if (formObj.form.querySelector('.client-form__server-err')) {
      formObj.form.querySelector('.client-form__server-err').remove();
    }
    if (validate(formObj, validateInputs).children.length > 0) {
      validate(formObj, validateInputs);
      formObj.form.classList.add('no-validate');
    } else {
      if (document.querySelector('.client-form-errors')) {
        document.querySelector('.client-form-errors').remove();
      }
      let name = formObj.nameField.input.value.trim();
      name = name[0].toUpperCase() + name.slice(1);
      let surname = formObj.surnameField.input.value.trim();
      surname = surname[0].toUpperCase() + surname.slice(1);
      let lastName = formObj.lastnameField.input.value.trim();
      if (lastName) {
        lastName = lastName[0].toUpperCase() + lastName.slice(1);
      }
      let contactsArr = [];
      const contactsObjs = formObj.contactsWrap.querySelectorAll('.client-form__contact-wrap');
      contactsObjs.forEach((contactsObj) => {
        const contactObj = {
          type: contactsObj.querySelector('select option').value,
          value: contactsObj.querySelector('.client-form__input').value.trim()
        };
        contactsArr.push(contactObj);
      });
      return {
        name,
        surname,
        lastName,
        contactsArr,
      }
    }
  }

  // Функция для добавления или изменения клиента
  async function serverRequest (formObj, formData, url, method) {
    if (formData) {
      // убираем возможность редактирования полей на время взаимодействия с сервером
      formObj.form.querySelectorAll('.client-form__input ').forEach((input) => {
        input.setAttribute('disabled', true);
      });

      const name = formData.name;
      const surname = formData.surname;
      const lastName = formData.lastName;
      const contactsArr = formData.contactsArr;

      const response = await fetch(`${url}`, {
        method: `${method}`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name,
          surname,
          lastName,
          contacts: contactsArr,
        }),
      })
      .then(async res => {
        if(res.ok) {
          res;
          document.querySelector('.modal.show').classList.remove('show');
          resetForm(formObj.form);
        }
      })
      .catch(err => {
        const serverErr = document.createElement('p');
        serverErr.classList.add('client-form__server-err');
        if(err) {
          serverErr.innerHTML = `${err}`;
          formObj.contactsWrap.after(serverErr);
        } else {
          serverErr.innerHTML = 'Что-то пошло не так...';
          formObj.contactsWrap.after(serverErr);
        }
      });
    } else {
      // делаем поля доступными, если валидация не пройдена
      formObj.form.querySelectorAll('.client-form__input ').forEach((input) => {
        input.removeAttribute('disabled');
      });
    }
    return;
  }

  // Функция сортировки клиентов
  function sortClients(arr, sortProp, isSort = false) {
    arr.map((item) => {
      if (item.lastname) {
        item.fullname = (item.surname + item.name + item.lastname).toLowerCase();
      } else {
        item.fullname = (item.surname + item.name).toLowerCase();
      }
      return item;
    });
    arr.forEach((client) => {
      if (isSort) {
        if (!isNaN(Number(client[sortProp]))) {
          arr.sort((a, b) => Number(b[sortProp]) - Number(a[sortProp]));
        } else if (!isNaN(Date.parse(client[sortProp]))) {
          arr.sort((a, b) => Date.parse(b[sortProp]) - Date.parse(a[sortProp]));
        } else {
          arr.sort((a, b) => b[sortProp].localeCompare(a[sortProp]));
        }
      } else {
        if (!isNaN(Number(client[sortProp]))) {
          arr.sort((a, b) => Number(a[sortProp]) - Number(b[sortProp]));
        } else if (!isNaN(Date.parse(client[sortProp]))) {
          arr.sort((a, b) => Date.parse(a[sortProp]) - Date.parse(b[sortProp]));
        } else {
          arr.sort((a, b) => a[sortProp].localeCompare(b[sortProp]));
        }
      }
    });
    return arr;
  }

  // Функция получения списка клиентов из поиска.
  async function getSearchClients(str) {
    // const tablePreloader = document.querySelector('.table__preloader');
    // tablePreloader.classList.add('show'); //Нужно для поиска без автодополнения
    const response = fetch(`http://localhost:3000/api/clients?search=${str}`)
      .then(async res => {
        if(res.ok) {
          const clientsList = await res.json();
          const findClients = [...clientsList];
          //tablePreloader.classList.remove('show');//Нужно для поиска без автодополнения
          return findClients;
        }
      })
      .catch(err => {
        //tablePreloader.classList.remove('show');//Нужно для поиска без автодополнения
        if(err) {
          alert(err);
        } else {
          alert('Что-то пошло не так...');
        }
      })
    return response;
  }

  ///////////////////////////////////////
  ////////// Фунцкция создания приложения
  async function createClientApp() {
    const containerApp = document.getElementById('crm-app');
    const appTitle = createAppTitle();
    const clientsTableObj = createClientsTable();
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementById('search-input');

    // Форма и модальное окно добавить нового клиента
    const addNewClientForm = createAddClientForm();
    addNewClientForm.formTitle.textContent = 'Новый клиент';
    const addNewClientModal = createModalWindow(addNewClientForm.form);
    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('type', 'button');
    cancelBtn.classList.add('modal__cancel-btn');
    cancelBtn.textContent = 'Отмена';
    addNewClientModal.querySelector('.modal__content').append(cancelBtn);
    cancelBtn.addEventListener('click', () => {
      resetForm(addNewClientForm.form);
      addNewClientModal.classList.remove('show');
    });

    // кнопка добавить нового клиента
    const addNewClientBtn = document.createElement('button');
    addNewClientBtn.classList.add('add-client-btn');
    addNewClientBtn.innerHTML = "<svg class='add-client-btn__icon'><use xlink:href='#add-client'></use></svg> Добавить клиента"
    addNewClientBtn.addEventListener('click', (e) => {
      addNewClientModal.classList.add('show');
    });

    // модальное окно удаление клиента
    const deleteClientWrap = document.createElement('div');
    deleteClientWrap.classList.add('client-delete');
    const deleteClientTitle = document.createElement('h3');
    deleteClientTitle.classList.add('client-delete__title');
    deleteClientTitle.textContent = 'Удалить клиента';
    const deleteClientText = document.createElement('p');
    deleteClientText.classList.add('client-delete__text');
    deleteClientText.textContent = 'Вы действительно хотите удалить данного клиента?';
    const deleteClientBtnModal = document.createElement('button');
    deleteClientBtnModal.classList.add('client-delete__btn', 'btn');
    deleteClientBtnModal.textContent = 'Удалить';
    const deleteClientBtnCancel = document.createElement('button');
    deleteClientBtnCancel.classList.add('client-delete__cancel', 'modal__cancel-btn');
    deleteClientBtnCancel.textContent = 'Отмена';
    deleteClientBtnCancel.addEventListener('click', () => {
      deleteClientModal.classList.remove('show');
    })
    deleteClientWrap.append(deleteClientTitle, deleteClientText, deleteClientBtnModal, deleteClientBtnCancel);
    const deleteClientModal = createModalWindow(deleteClientWrap);

    // Форма и модальное окно изменить клиента
    const changeClientForm = createAddClientForm();
    changeClientForm.formTitle.textContent = 'Изменить данные';
    const changeClientFormId = document.createElement('span');
    changeClientFormId.classList.add('client-form__id');
    changeClientForm.formTitleWrap.append(changeClientFormId);
    const changeClientModal = createModalWindow(changeClientForm.form);
    const deleteClientBtn = document.createElement('button');
    deleteClientBtn.setAttribute('type', 'button');
    deleteClientBtn.classList.add('modal__cancel-btn');
    deleteClientBtn.textContent = 'Удалить клиента';
    changeClientModal.querySelector('.modal__content').append(deleteClientBtn);

    containerApp.append(appTitle, clientsTableObj.table, addNewClientBtn, addNewClientModal, changeClientModal, deleteClientModal);

    // Обработчики
    const handlers = {
      async onAdd(formObj) {
        const urlPost = 'http://localhost:3000/api/clients';
        const addMethod = 'POST';
        const formData = getFormData(formObj);
        await serverRequest(formObj, formData, urlPost, addMethod);
      },
      async onChange(formObj, clientObj) {
        const clientId = clientObj.id;
        const urlPost = `http://localhost:3000/api/clients/${clientId}`;
        const addMethod = 'PATCH';
        const formData = getFormData(formObj);
        await serverRequest(formObj, formData, urlPost, addMethod);
      },
      async onDelete(id) {
        await fetch(`http://localhost:3000/api/clients/${id}`, {
          method: 'DELETE',
        });
      },
    }

    // отрисовываем таблицу
    let clientsList = await getClients();

    // Из формы изменения клиента
    let deleteClientId = changeClientForm.form.querySelector('.client-form__id').innerHTML;

    // Функция отрисовки таблицы клиентов
    function renderClientsTable(clientsArray) {
      if (clientsArray) {
        const tableBody = document.querySelector('.clients-table__body');
        tableBody.querySelectorAll('.clients-table__client-row').forEach(row => {
          if(row)
            row.remove();
        });
        if (clientsArray.length > 0) {
          clientsArray.forEach((client) => {
            const tr = createClientElement(client);
            tableBody.append(tr);
            const changeBtn =  tr.querySelector('.clients-table__change-btn');
            const deleteBtn = tr.querySelector('.clients-table__delete-btn');
            const clientId = tr.id;
            deleteClientId = clientId;
             // Вешаем событие на кнопку изменить клиента
            changeBtn.addEventListener('click', async () => {
              changeBtn.querySelector('.clients-table__change-btn-preloader').classList.remove('hide');
              changeBtn.querySelector('.clients-table__change-btn-icon').classList.add('hide');
              const response = await fetch(`http://localhost:3000/api/clients/${clientId}`);
              const clientObj = await response.json();
              if (clientObj) {
                changeBtn.querySelector('.clients-table__change-btn-preloader').classList.add('hide');
                changeBtn.querySelector('.clients-table__change-btn-icon').classList.remove('hide');
                changeClientModal.classList.add('show');
                window.location.hash = clientId;
              }
            });

            // Вешаем событие на кнопку удалить клиента
            deleteBtn.addEventListener('click', async () => {
              deleteBtn.querySelector('.clients-table__delete-btn-preloader').classList.remove('hide');
              deleteBtn.querySelector('.clients-table__delete-btn-icon').classList.add('hide');
              const response = await fetch(`http://localhost:3000/api/clients/${deleteClientId}`);
              const clientObj = await response.json();
              if (clientObj) {
                deleteBtn.querySelector('.clients-table__delete-btn-preloader').classList.add('hide');
                deleteBtn.querySelector('.clients-table__delete-btn-icon').classList.remove('hide');
                deleteClientModal.classList.add('show');
                deleteClientBtnCancel.addEventListener('click', () => {
                  deleteClientModal.classList.remove('show');
                });
              }
            })
          });
        };
      }
      return;
    }
    // Отрисовываем таблицу и создаем копию, чтобы не изменять исходный массив и использовать ее при сортировке,
    // не делая запросы на сервер
    let copyClientsArr = clientsList.slice();
    copyClientsArr = sortClients(copyClientsArr, 'id');
    renderClientsTable(copyClientsArr);

    // Добавление клиента
    addNewClientForm.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handlers.onAdd(addNewClientForm);
      clientsList = await getClients();
      copyClientsArr = clientsList.slice();
      sortClients(copyClientsArr, 'id');
      renderClientsTable(copyClientsArr);
    });

    // Функция заполнения и открытия формы по ссылке
    async function createClientByLink() {
      if (window.location.hash) {
        const clientId = window.location.hash.slice(1);
        if (clientId) {
          const response = await fetch(`http://localhost:3000/api/clients/${clientId}`);
          const clientObj = await response.json();
          fillChangeForm(changeClientForm, clientObj);
          changeClientModal.classList.add('show');
        }
      }
    };

    // Выполняем ее при загрузке
    await createClientByLink();

    // При изменении hash
    window.addEventListener('hashchange', async (e) => {
      await createClientByLink();
    });


    // Изменение клиента
    changeClientForm.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const clientId = changeClientForm.form.querySelector('.client-form__id').innerHTML.slice(4);
      const response = await fetch(`http://localhost:3000/api/clients/${clientId}`);
      const clientObj = await response.json();
      if (clientObj) {
        await handlers.onChange(changeClientForm, clientObj);
        clientsList = await getClients();
        copyClientsArr = clientsList.slice();
        sortClients(copyClientsArr, 'id');
        renderClientsTable(copyClientsArr);
      }
    });

    // Удаление клиента
    deleteClientBtn.addEventListener('click', () => {
      changeClientModal.classList.remove('show');
      deleteClientModal.classList.add('show');
    })
    deleteClientBtnModal.addEventListener('click', async () => {
      await handlers.onDelete(deleteClientId);
      clientsList = await getClients();
      copyClientsArr = clientsList.slice();
      sortClients(copyClientsArr, 'id');
      renderClientsTable(copyClientsArr);
      deleteClientModal.classList.remove('show');
    });

  // Поиск
  // Функция для обычного поиска с перерисовкой
  /*async function searchClients() {
    const searchStr = searchInput.value;
    if (searchStr) {
      clientsList = await getSearchClients(searchStr);
      if (clientsList) {
        copyClientsArr = clientsList.slice();
        sortClients(copyClientsArr, 'id');
        renderClientsTable(copyClientsArr);
      } else {
        clientsList = [];
        copyClientsArr = clientsList.slice();
        sortClients(copyClientsArr, 'id');
        renderClientsTable(copyClientsArr);
      }
    } else {
      clientsList = await getClients();
      if (clientsList) {
        copyClientsArr = clientsList.slice();
        sortClients(copyClientsArr, 'id');
        renderClientsTable(copyClientsArr);
      }
    }
  }
  // Поиск при изменении поля
  searchInput.addEventListener('input', () => {
    setTimeout(async () => {
      await searchClients();
    }, 300);
  });
  // Поиск по нажатию на enter
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await searchClients();
  }) */

  // Создаем список автодополнения и добавляем на страницу
  const autocomleteList = document.createElement('ul');
  autocomleteList.classList.add('search-form__autocomplete-list');
  searchForm.append(autocomleteList);

  // Вспомогательные функции подсветки и перемещения при выборе автодополнения
  // заполняем интпут выбранным клиентом по клику на enter
  // Функция при нажатии на enter
  function enter(focused) {
    if (document.querySelector('.clients-table__client-row.find')) {
      document.querySelector('.clients-table__client-row.find').classList.remove('find');
    }
    searchInput.value = focused.textContent;
    const tableClientEl = document.getElementById(`${focused.dataset.path}`);
    tableClientEl.scrollIntoView({block: "center", inline: "center", behavior: "smooth"});
    tableClientEl.classList.add('find');
    // Убираем фокус
    searchInput.blur();
    // Очищаем список автодополнения
    autocomleteList.innerHTML = '';
  }
  // Функция фокусировки предыдущего элемента поиска с клавиатуры
  function selectPrev(focused, listElems) {
    let newFocused;
    if (focused) {
      focused.classList.remove('focused');
      newFocused = focused.previousElementSibling;
      if (!newFocused) {
        newFocused = listElems[listElems.length - 1];
      }
    }
    if (newFocused)
      newFocused.classList.add('focused');
  }
  // Функция фокусировки следующего элемента поиска с клавиатуры
  function selectNext(focused, listElems) {
    let newFocused;
    if (focused) {
      focused.classList.remove('focused');
      newFocused = focused.nextElementSibling;
      if (!newFocused) {
        newFocused = listElems[0];
      }
    }
    if (newFocused)
      newFocused.classList.add('focused');
  }

  // Фунцкция поиска с автодополнением
  async function autocompleteSearchClients() {
    if(autocomleteList.childNodes) {
      autocomleteList.innerHTML = '';
    }
    // создаем и добавляем необходимые элементы на страницу
    const searchStr = searchInput.value;
    if (searchStr) {
      const findClientsList = await getSearchClients(searchStr);
      if (findClientsList.length > 0) {
        sortClients(findClientsList, 'id');
        findClientsList.forEach(client => {
          const autocompleteItem = document.createElement('li');
          autocompleteItem.classList.add('search-form__autocomplete-item');
          autocompleteItem.setAttribute('data-path', `${client.id}`);
          autocompleteItem.style.cursor = 'pointer';
          autocompleteItem.innerHTML = `${client.name} ${client.surname}`;
          // Поиск по клику мыши
          autocompleteItem.addEventListener('click', () => {
            enter(autocompleteItem);
          })
          autocomleteList.append(autocompleteItem);
        });
        autocomleteList.childNodes[0].classList.add('focused');
      } else {
        const autocompleteItem = document.createElement('li');
        autocompleteItem.classList.add('search-form__autocomplete-item', 'search-form__autocomplete-item-none');
        autocompleteItem.innerHTML = 'Ничего не найдено...';
        autocomleteList.append(autocompleteItem);
      }
    } else {
      if(autocomleteList.childNodes) {
        autocomleteList.innerHTML = '';
      }
    }
    return;
  }

  // Поиск при изменении поля
  searchInput.addEventListener('input', async () => {
    if (document.querySelector('.clients-table__client-row.find')) {
      document.querySelector('.clients-table__client-row.find').classList.remove('find');
    }
    setTimeout( async () => {
      await autocompleteSearchClients();
    }, 300);
  });

  // поиск с помощью клавиш
  document.addEventListener('keydown', (evt) => {
    const keysToListen = ['ArrowUp', 'ArrowDown', 'Enter'];
    if (autocomleteList && keysToListen.includes(evt.key)) {
      const focused = document.querySelector('.focused');
      const listElems = Array.from(autocomleteList.childNodes);
      switch (evt.key) {
        case 'ArrowUp':
          selectPrev(focused, listElems);
          break;
        case 'ArrowDown':
          selectNext(focused, listElems);
          break;
        case 'Enter':
          enter(focused);
          break;
      }
    }
  });

  // Скрываем список при клике вне формы поиска
  document.body.addEventListener('click', (e) => {
    if (!e.target.closest('.search-form')) {
      autocomleteList.innerHTML = '';
    }
  });

  // Поиск по нажатию на enter
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await autocompleteSearchClients();
  });

  // Сортировака
  const sortableBtnsArr = Array.from(document.querySelectorAll('.clients-table__head.sortable'));
  sortableBtnsArr.forEach((th) => {
    th.addEventListener('click', () => {
      let isSort = false;
      const prop = th.getAttribute('id');
      sortableBtnsArr.map(item => {
        if(item !== th)  {
          item.classList.remove('sort');
        }
      });
      if (th.classList.contains('sort')) {
        isSort = true;
      }
      th.classList.toggle('sort');
      sortClients(copyClientsArr, prop, isSort);
      renderClientsTable(copyClientsArr);
      isSort = !isSort;
    });
  });

  }

  window.createClientApp = createClientApp;
})();
