| path                                        | origin size | gzipped size | compressed size |
| :------------------------------------------ | ----------: | -----------: | --------------: |
| store\dist\amd\index.js                     |      6.52kb |       2.63kb |          2.37kb |
| store\dist\cjs\index.js                     |      6.64kb |       2.61kb |          2.36kb |
| store\dist\es\index.js                      |      3.46kb |       1.51kb |          1.37kb |
| store\dist\es\plugins\devtool.js            |      2.43kb |       1.08kb |          0.93kb |
| store\dist\es\plugins\encrypt.js            |      0.59kb |       0.35kb |           0.3kb |
| store\dist\es\plugins\module-hash-plugin.js |       0.4kb |       0.29kb |          0.25kb |
| count all                                   |     20.04kb |       8.47kb |          7.58kb |

// 满足 compoinstion api 分拆模块需求

```typescript
class Store extends StoreManager {
    app: AppModule
    user: UserModule
}
export = store

// use
import { app } from './store'
```
