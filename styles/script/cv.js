let imageDataURL = '';

// Gestion photo
document.getElementById('photoInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = function() {
    imageDataURL = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  }
});

// Ajout dynamique expérience
function addExperience(idContainer) {
  const container = document.getElementById(idContainer);
  const div = document.createElement('div');
  div.classList.add('item');
  div.innerHTML = `
    <input type="text" placeholder="Entreprise / Structure" />
    <input type="text" placeholder="Ville" />
    <input type="text" placeholder="Poste" />
    <input type="text" placeholder="MM/AAAA - MM/AAAA" />
  `;
  container.appendChild(div);
}

// Ajout dynamique formation
function addFormation() {
  const container = document.getElementById('formations');
  const div = document.createElement('div');
  div.classList.add('item');
  div.innerHTML = `
    <input type="text" placeholder="Intitulé formation" />
    <input type="text" placeholder="Etablissement" />
    <input type="text" placeholder="Année" />
  `;
  container.appendChild(div);
}

// Génération CV HTML
function genererCV() {
  const cvDiv = document.getElementById('cv');
  const modele = document.getElementById('modeleCV').value;
  document.body.className = modele;

  // Infos perso
  const nom = document.getElementById('nom').value;
  const posteDesire = document.getElementById('posteDesire').value;
  const email = document.getElementById('email').value;
  const telephone = document.getElementById('telephone').value;
  const adresse = document.getElementById('adresse').value;
  const resume = document.getElementById('resume').value;
  const langues = document.getElementById('langues').value;
  const loisirs = document.getElementById('loisirs').value;

  // Expériences Pro
  const expProNodes = document.getElementById('experiencesPro').querySelectorAll('.item');
  const experiencesPro = Array.from(expProNodes).map(div => {
    const inputs = div.querySelectorAll('input');
    return {
      entreprise: inputs[0].value,
      ville: inputs[1].value,
      poste: inputs[2].value,
      periode: inputs[3].value,
    };
  }).filter(e => e.entreprise || e.poste);

  // Expériences Bénévoles
  const expBenevNodes = document.getElementById('experiencesBenevolat').querySelectorAll('.item');
  const experiencesBenevolat = Array.from(expBenevNodes).map(div => {
    const inputs = div.querySelectorAll('input');
    return {
      structure: inputs[0].value,
      ville: inputs[1].value,
      poste: inputs[2].value,
      periode: inputs[3].value,
    };
  }).filter(e => e.structure || e.poste);

  // Formations
  const formationsNodes = document.getElementById('formations').querySelectorAll('.item');
  const formations = Array.from(formationsNodes).map(div => {
    const inputs = div.querySelectorAll('input');
    return {
      intitule: inputs[0].value,
      etablissement: inputs[1].value,
      annee: inputs[2].value,
    };
  }).filter(f => f.intitule);

  // Générer HTML
  cvDiv.innerHTML = `
    <div class="left">
      ${imageDataURL ? `<img src="${imageDataURL}" alt="Photo" class="photo" />` : ''}
      <h2>${nom}</h2>
      <p><strong>${posteDesire}</strong></p>
      <p>Email : ${email}</p>
      <p>Téléphone : ${telephone}</p>
      <p>Adresse : ${adresse}</p>

      <div class="section">
        <h3>Langues</h3>
        <p>${langues.replace(/\n/g, '<br>')}</p>
      </div>
      <div class="section">
        <h3>Loisirs</h3>
        <p>${loisirs.replace(/\n/g, '<br>')}</p>
      </div>
    </div>

    <div class="right">
      <div class="section">
        <h3>Résumé</h3>
        <p>${resume.replace(/\n/g, '<br>')}</p>
      </div>

      <div class="section">
        <h3>Expériences Professionnelles</h3>
        ${experiencesPro.map(e => `
          <div class="item">
            <p><strong>${e.poste}</strong> - ${e.entreprise}, ${e.ville}</p>
            <p><em>${e.periode}</em></p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h3>Expériences Bénévoles</h3>
        ${experiencesBenevolat.map(e => `
          <div class="item">
            <p><strong>${e.poste}</strong> - ${e.structure}, ${e.ville}</p>
            <p><em>${e.periode}</em></p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h3>Formations</h3>
        ${formations.map(f => `
          <div class="item">
            <p><strong>${f.intitule}</strong> - ${f.etablissement}</p>
            <p><em>${f.annee}</em></p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Rendre les listes drag & drop
  makeSortable();
}

// Initialisation du drag and drop avec SortableJS
function makeSortable() {
  ['experiencesPro', 'experiencesBenevolat', 'formations'].forEach(id => {
    const el = document.getElementById(id);
    Sortable.create(el, {
      animation: 150,
      ghostClass: 'sortable-ghost',
    });
  });
}

// Fonction pour générer le PDF du CV
function telechargerPDF() {
  const cvDiv = document.getElementById('cv');
  if (!cvDiv.innerHTML.trim()) {
    alert("Veuillez générer le CV avant de le télécharger.");
    return;
  }

  const opt = {
    margin:       0.5,
    filename:     'cv_tonami_center_skills.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(cvDiv).save();
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  makeSortable();
});
