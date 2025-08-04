# Dossier des fichiers média

Ce dossier contient tous les fichiers audio, vidéo et PDF de l'application.

## Structure recommandée :

```
public/media/
├── audio/
│   ├── introduction-au-tawhid.mp3
│   └── autres-fichiers-audio.mp3
├── video/
│   ├── cours-video.mp4
│   └── autres-videos.mp4
└── documents/
    ├── cours-pdf.pdf
    └── autres-documents.pdf
```

## Formats supportés :
- **Audio** : MP3, WAV, OGG
- **Vidéo** : MP4, WebM, OGV
- **Documents** : PDF

## Pour ajouter un fichier :
1. Placez votre fichier dans le dossier approprié
2. Mettez à jour l'URL dans le code pour pointer vers le bon chemin
3. Le fichier sera automatiquement accessible via l'interface

## Exemple d'URL :
- Audio : `/media/audio/introduction-au-tawhid.mp3`
- Vidéo : `/media/video/cours-video.mp4`
- PDF : `/media/documents/cours-pdf.pdf` 