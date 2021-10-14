const searchInput = document.getElementById('search-contact');
const addNewItem = document.getElementById('plus-icon');
const content = document.querySelector('.content-list');

const modalBox = document.querySelector('.modal-container');
const modalForm = document.querySelector('.modal');

const modalInputName = document.getElementById('name');
const modalInputPhone = document.getElementById('phone');

const generateID = () => Math.round(Math.random() * 1000);

const contactsStoregeList = JSON.parse(localStorage.getItem('contact'));
const contactList = localStorage.getItem('contact') != null ? contactsStoregeList : [];

function updateContactStore() {
    localStorage.setItem('contact', JSON.stringify(contactList));
}

window.onload = () => {
    searchInput.addEventListener('input', searchInListContact);
    addNewItem.onclick = () => showModal(true);
    modalForm.addEventListener('submit', createNewItem);

    init();
}


function init() {
    content.innerHTML = '';
    contactList.forEach(it => createContentItem(it));
}

function createContentItem(user) {
    const li = document.createElement('li');
    const profile = document.createElement('div');

    const img = document.createElement('img');
    const profileInfo = document.createElement('div');

    const span = document.createElement('span');
    const p = document.createElement('p');

    const iconDelete = document.createElement('i');

    img.src = user.profile;
    img.alt = 'profile';

    span.innerHTML = user.name;
    p.innerHTML = user.phone;

    profileInfo.append(span);
    profileInfo.append(p);
    profileInfo.className = "profile-info";


    profile.append(img);
    profile.append(profileInfo);
    profile.className = "profile";

    iconDelete.className = 'bx bx-x';
    iconDelete.onclick = () => deleteItem(user);
    iconDelete.setAttribute('id', 'delete-contact');

    li.append(profile)
    li.append(iconDelete)
    content.append(li);
}

function deleteItem(user) {
    contactList.pop(user);
    updateContactStore();
    init();
}

function showModal(isVisible) {
    if (isVisible) {
        modalBox.classList.toggle('active')
    } else {
        modalBox.classList.remove('active')
    }
}

function searchInListContact() {
    const searchText = searchInput.value;
    const result = contactList.filter(it => it.name.toLowerCase().includes(searchText.toLowerCase()));

    if (result.length >= 1 || searchText != '') {
        content.innerHTML = '';
        result.forEach(it => createContentItem(it));
    }

}

function createNewItem(event) {
    event.preventDefault();

    const name = modalInputName.value.trim();
    const phone = modalInputPhone.value.trim();

    if (phone.length < 11) {
        alert('Telefone inválido, por favor preencha os campos corretamente, informando o DDD o digito 9');
        return;
    }

    const fisrtDigits = phone.substring(0, 2);
    const secondDigits = phone.substring(2, 7);
    const lastDigits = phone.substring(7);

    const formattedPhone = `(${fisrtDigits}) ${secondDigits}-${lastDigits}`;
    const newUser = {
        id: generateID(),
        name: name, phone: formattedPhone,
        profile: `https://source.unsplash.com/random?sig=${generateID()}`,
    };

    contactList.push(newUser);

    showModal(false);
    modalInputName.value = '';
    modalInputPhone.value = '';
    updateContactStore();
    init();
}