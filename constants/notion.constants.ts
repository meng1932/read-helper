export const BOOKSHELF_TEMPLATE = {
  parent: {
    type: "page_id",
    page_id: ""
  },
  icon: {
    type: "emoji",
    emoji: "📚"
  },
  cover: {
    type: "external",
    external: {
      "url": "https://images.unsplash.com/photo-1514593214839-ce1849100055?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
    }
  },
  description: [
    {
      type: "text",
      text: {
        content: "Use this reading list template as your personal digital bookshelf!",
        link: null
      },
      annotations: {
        bold: true,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default"
      }
    },
    {
      type: "text",
      text: {
        content: " Simply move book cards between \"Not Started,\" \"In Progress,\" and \"Completed\" to track your progress. For detailed notes, click on any book card to access its dedicated note-taking page. Add new books quickly by clicking the \"+ New\" button. Happy reading!",
        link: null
      }
    }
  ],
  title: [
    {
      type: "text",
      text: {
        content: "My Bookshelf",
      },
    },
  ],
  is_inline: true,
  properties: {
    Name: {
      title: {},
    },
    Rating: {
      id: "rating",
      type: "select",
      select: {
        options: [
          {
            id: "rating-5",
            "name": "⭐️⭐️⭐️⭐️⭐️",
          },
          {
            "name": "⭐️⭐️⭐️⭐️"
          },
          {
            "name": "⭐️⭐️⭐️",
          },
          {
            "name": "⭐️⭐️"
          },
          {
            "name": "⭐️",
          }
        ]
      }
    },
    Category: {
      name: "Category",
      type: "select",
      select: {
        options: [
          {
            "id": "category-fiction",
            "name": "Fiction",
            "color": "default",
            "description": null
          },
          {
            "id": "c=h>",
            "name": "Non-fiction",
            "color": "gray",
            "description": null
          },
          {
            "id": "KVs?",
            "name": "Biography",
            "color": "brown",
            "description": null
          },
          {
            "id": "NQ=c",
            "name": "Mystery",
            "color": "orange",
            "description": null
          },
          {
            "id": "KCiD",
            "name": "Fantasy",
            "color": "yellow",
            "description": null
          },
          {
            "id": "ONMK",
            "name": "Science Fiction",
            "color": "pink",
            "description": null
          },
          {
            "id": "]V_d",
            "name": "Historical",
            "color": "blue",
            "description": null
          },
          {
            "id": "BE~b",
            "name": "Romance",
            "color": "purple",
            "description": null
          },
          {
            "id": "QUR\\",
            "name": "Thriller",
            "color": "pink",
            "description": null
          },
          {
            "id": "kSWq",
            "name": "Self-help",
            "color": "red",
            "description": null
          },
          {
            "id": "kU[r",
            "name": "Poetry",
            "color": "default",
            "description": null
          },
          {
            "id": "iR}l",
            "name": "Graphic Novel",
            "color": "brown",
            "description": null
          },
          {
            "id": ":~SF",
            "name": "Adventure",
            "color": "orange",
            "description": null
          },
          {
            "id": "wTt{",
            "name": "Horror",
            "color": "yellow",
            "description": null
          },
          {
            "id": "gk^K",
            "name": "True Crime",
            "color": "green",
            "description": null
          },
          {
            "id": "U{qF",
            "name": "Children's",
            "color": "blue",
            "description": null
          },
          {
            "id": "~GAU",
            "name": "Young Adult",
            "color": "purple",
            "description": null
          },
          {
            "id": "|nHC",
            "name": "Classic Literature",
            "color": "yellow",
            "description": null
          },
          {
            "id": "GB<k",
            "name": "Philosophy",
            "color": "red",
            "description": null
          },
          {
            "id": "PI|v",
            "name": "Anthology",
            "color": "default",
            "description": null
          }
        ]
      }
    },
    "Publisher": {
      "id": "%3FGCF",
      "name": "Publisher",
      "type": "rich_text",
      "rich_text": {}
    },
    "ISBN": {
      "id": "UQCK",
      "name": "ISBN",
      "type": "rich_text",
      "rich_text": {}
    },
    "Source": {
      "id": "b%7D%3Bv",
      "name": "Source",
      "type": "select",
      "select": {
        "options": [
          {
            "id": "U>AX",
            "name": "WeRead",
            "color": "default",
            "description": null
          },
          {
            "id": "kZkR",
            "name": "Libby",
            "color": "red",
            "description": null
          }
        ]
      }
    },
    "Dates": {
      "id": "gN%7CO",
      "name": "Dates",
      "type": "date",
      "date": {}
    },
    "Author": {
      "id": "qNw_",
      "name": "Author",
      "type": "rich_text",
      "rich_text": {}
    }
  },
}

export const NOTION_PAGE = {
  "object": "page",
  "id": "134e24f1-558c-8089-a441-ed04d319199f",
  "created_time": "2024-11-04T03:42:00.000Z",
  "last_edited_time": "2024-11-19T22:59:00.000Z",
  "created_by": {
    "object": "user",
    "id": "4385ec29-0bdd-4c45-b44a-f930d230d413"
  },
  "last_edited_by": {
    "object": "user",
    "id": "4385ec29-0bdd-4c45-b44a-f930d230d413"
  },
  "cover": null,
  "icon": {
    "type": "emoji",
    "emoji": "📕"
  },
  "parent": {
    "type": "database_id",
    "database_id": "1a7c1b8e-904e-48d7-aec1-252b41d61a73"
  },
  "archived": false,
  "in_trash": false,
  "properties": {
    "Date": {
      "id": "%3AWp%3B",
      "type": "date",
      "date": {
        "start": "2024-11-03",
        "end": null,
        "time_zone": null
      }
    },
    "界": {
      "id": "%3BHll",
      "type": "select",
      "select": {
        "id": "acbae905-2278-4fb0-9936-3586cc9298ea",
        "name": "生活",
        "color": "green"
      }
    },
    "门": {
      "id": "%40oIe",
      "type": "select",
      "select": {
        "id": "d605baf7-b5f3-4e27-b85c-9b1d4b10a099",
        "name": "图书",
        "color": "blue"
      }
    },
    "目": {
      "id": "ECjj",
      "type": "multi_select",
      "multi_select": [
        {
          "id": "11dfaf79-dd44-4866-a38e-4dffbb360454",
          "name": "未知作者",
          "color": "pink"
        }
      ]
    },
    "Hightlight": {
      "id": "YCAV",
      "type": "rich_text",
      "rich_text": []
    },
    "纲": {
      "id": "%5CAdD",
      "type": "select",
      "select": null
    },
    "Name": {
      "id": "title",
      "type": "title",
      "title": [
        {
          "type": "text",
          "text": {
            "content": "阅读笔记",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "阅读笔记",
          "href": null
        }
      ]
    }
  },
  "url": "https://www.notion.so/134e24f1558c8089a441ed04d319199f",
  "public_url": null,
  "request_id": "d386a32e-f86c-401a-88c8-a6738088349e"
}

export enum NOTION_PAGE_TYPE {
  DATABASE = "database",
  PAGE = "page"
}