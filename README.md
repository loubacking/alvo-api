## ENDPOINTS
GET `/status` - Show API Status


POST `/artists` - Create Artist
```
Content-Type: application/json
Body {
	"name": "ARTIST_NAME",
	"image": "ARTIST_IMAGE_URL"
}
```
GET `/artists` - List all Artists

GET `/artists/:id` - Find Artist by Id

GET `/artists/:id/songs` - List all Songs of Artist

POST `/songs` - Create Song
```
Content-Type: application/json
Body {
    "artistId": "ARTIST_ID",
	"name": "ARTIST_NAME",
	"lyrics": "LYRICS"
}
```
GET `/songs` - List all Songs

GET `/searchSong?keyword=KEYWORD` - Search Songs by Keyword

GET `/searchArtist?keyword=KEYWORD` - Search Artists by Keyword

> Keyword can be passed on params when you call them