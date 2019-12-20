# pkce

PKCE code verifier and challenge generator.

## Usage

```js
import { create } from 'pkce';

const codePair = create();

// {
//   codeVerifier: 'Mv-rZ7xc6mGR3el5jzpDI~yTQDEExcNX2MD74wbC16dNcBpMyPw1S8bQMxrKA2M_K38HPILBp0bgrsuEfGWdb.Tm8tFlRbamb.SZFJlTq_pHcvOj0fSUwdeFA~AJkNHv',
//   codeChallenge: 'cnowaks5b1ZzWjdqN0FOOS8xZ1NoYkJ0VmFRSTBKRXg1Sjh3RFM5VzAvST0'
// }
```
