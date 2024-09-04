# yn


```js
// --run--
const { content } = await ctx.api.readFile({ repo: 'test', path: '/2022/其他/log.c.md' })

let count = 0

async function hack (password) {
    try {
        count++

        if (count % 100000 === 0) {
            console.log('已尝试', count, '次', password)
            await ctx.utils.sleep(20)
        }

        ctx.utils.crypto.decrypt(content, password)
        ctx.ui.useModal().alert({title: '破解成功', content: '密码是：' + password})
        console.log('破解成功，密码是：' + password)
        return true
    } catch (e) {
        return false
    }
}

async function hackPasswords(minLength, maxLength) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    async function helper(prefix, length) {
        if (length === 0) {
            if ((await hack(prefix))) {
                throw new Error('破解完成')
            }
            return;
        }

        for (let i = 0; i < characters.length; i++) {
            await helper(prefix + characters[i], length - 1);
        }
    }

    for (let length = minLength; length <= maxLength; length++) {
       await helper('', length);
    }
}

console.log('破解中，请不要关闭应用……')
await ctx.utils.sleep(100)
hackPasswords(3, 3)
```

