<h1 align="center">
    VocabVault 
</h1>

<div align="center">

[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)]()
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()
[![JS](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)]()
[![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)]()
[![Status](https://img.shields.io/badge/status-completed-green?style=for-the-badge)]()
[![License](https://img.shields.io/badge/license-MIT-red?style=for-the-badge)](/LICENSE)

</div>

An interactive web application that enriches vocabulary learning through daily words, personalized collections, and engaging study tools.

<table>
  <tr>
    <td>
      <img src="/website_images/homepage_img.png" alt="Homepage" width="400"/>
    </td>
    <td>
      <img src="/website_images/favorites_img.png" alt="Favorites page" width="400"/>
    </td>
  </tr>
</table>
<table>
  <tr>
    <td>
      <img src="/website_images/quizzes_img.png" alt="Quizzes page" width="400"/>
    </td>
    <td>
      <img src="/website_images/wordle_img.png" alt="Wordle game" width="400"/>
    </td>
  </tr>
</table>

## Overview

VocabVault focuses on broadening users' vocabulary through fun and educational features. The web application offers:

- Daily word showcase with meaning, function, and phonetics
- User authentication system for personalized experience
- Favorite words collection with CRUD operations
- Historical word access through an interactive calendar
- Interactive learning through Wordle-style games and flashcards

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Django (Python web framework)

## Team Members

- **Indigo cheuk-a-lam** (ich104)
- **Harun Yılmaz** (cnf877)
- **Michael Manso** (mma766)

## Architecture

<img src="/website_images/architecture.png" alt="Homepage" width="400"/>

## Installation Guide

### Prerequisites

- Git ([Installation Guide](https://github.com/git-guides/install-git))
- Python 3.x

### Cloning the Repository

Choose one of the following methods:

#### Option 1: Command Line
1. Open your terminal
2. Navigate to your desired directory
3. Run:
```bash
git clone https://github.com/VU-Applied-Programming-for-AI-2024/Group-39.git
```

#### Option 2: GitHub Desktop
Clone directly through GitHub desktop interface

### Setting Up the Environment

1. Navigate to the project directory:
```bash
cd vocab-vault
```

2. Create a Python virtual environment:
```bash
python -m venv myenv
```

3. Activate the virtual environment:
- Windows:
```bash
myenv\Scripts\activate
```
- macOS/Linux:
```bash
source myenv/bin/activate
```

4. Install required dependencies:
```bash
pip install -r requirements.txt
```

### Running the Application

1. Navigate to the Django project directory:
```bash
cd backend/vocabVault
```

2. Start the development server:
```bash
python manage.py runserver
```

3. Access the application at [http://127.0.0.1:8000/homepage](http://127.0.0.1:8000/homepage)

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgements

This project is a product of team work facilitated by the Applied Programming for AI course at VU Amsterdam.


## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

