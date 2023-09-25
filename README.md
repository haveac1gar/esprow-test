## Esprow test app

### How to run:
```
git clone https://github.com/haveac1gar/esprow-test.git
cd esprow-test
yarn
yarn start
```

### Generated file:
https://raw.githubusercontent.com/haveac1gar/esprow-test/main/generated.json

Template (https://json-generator.com/#):
```
[
  '{{repeat(10000)}}',
  {
    id: '{{guid()}}',
    isActive: '{{bool()}}',
	picture: "http://placehold.it/32x32",
    age: '{{integer(20, 40)}}',
    name: '{{firstName()}} {{surname()}}',
    email: '{{email()}}',
    address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    about: '{{lorem(1, "paragraphs")}}',
    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}'
  }
]
```