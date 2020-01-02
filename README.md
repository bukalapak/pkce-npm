# pkce

PKCE code verifier and challenge generator.

## Usage

```js
import { create } from 'pkce';

const codePair = create();

// {
//   codeVerifier: 'yzbnPbepnvPl6SUcsBzEf21geEkrzseCDLWAS0uliwKQlDEInT23zV6I2NidkkW4BeF4iVlt6.hdLlCNctqHAPCX7DOYB_7347w1Bk3xmBG10R~Se3~GDTRJfYPUf9.P',
//   codeChallenge: 'DDSuq_32Mlv86ucLNbNspsJ1QUZYz7dYf6L1AnN9Adk'
// }
```
