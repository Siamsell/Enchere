CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fullname TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  password TEXT NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Annonces(
  id INT PRIMARY KEY AUTO_INCREMENT,
  titre TEXT,
  description TEXT,
  telephone INT,
  date_debut DATETIME,
  date_fin DATETIME,
  prix TEXT,
  wilaya TEXT,
  commune TEXT,
  place_verification TEXT,
  place_vendre TEXT,
  telegram BOOLEAN,
  whatsapp BOOLEAN,
  viber BOOLEAN
);

CREATE TABLE Media(
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_annonce INT,
  path TEXT,
  image BOOLEAN,
  FOREIGN KEY(id_annonce) REFERENCES Annonces(id)
)

CREATE TABLE Abonnnement(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
	date_debut DATETIME,
    date_fin DATETIME,
    duree TEXT,
    price TEXT,
    status ENUM("attente","succes","annule"),
    FOREIGN KEY(user_id) REFERENCES Users(id)
);

index login cbn
recherche login cbn
profile login cbn
monAbonnnement login cbn

