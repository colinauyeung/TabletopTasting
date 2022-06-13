import urllib.request
import json
import os

path="twitchemotes"
if not os.path.exists(path):
    os.makedirs(path)

data = {}
with open("twitchglobalemotes.json", "r") as input:
    data = json.loads(input.read())

# print(data)
namedb = []
for emote in data["data"]:
    name = emote["name"]
    url = emote["images"]["url_4x"]
    nameres = name.replace("\\", "1")
    nameres = nameres.replace("/", "2")
    urllib.request.urlretrieve(url, "{0}/{1}.jpg".format(path, nameres))
    namedb.append(nameres)

print(namedb)



# urllib.request.urlretrieve("https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_89f3f0761c7b4f708061e9e4be3b7d17/static/light/3.0", "local-filename.jpg")