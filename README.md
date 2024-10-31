# 家計簿アプリ My Money Note

## About
- 収支を管理するためのアプリケーションです
- 収支の一覧表示、収支の登録・編集・削除ができます
- 現在の残高、当日と当月の収支を確認できます

## 技術スタック
- React 18.3.1
- React Router 6.27.0
- TypeScript 5.5.4
- TailwindCSS 3.4.13
- Vite 5.4.8
- JSON Server 1.0.0

## 機能一覧
### 全体
- ホーム画面
- 履歴画面

### ホーム画面
- 当日と当月の収支
- 現在の残高
- 収支の登録

### 履歴画面
- 収支の一覧表示
- 収支の編集・削除
- 収支の絞り込み表示
- 収支の並び替え表示

### データ構成
```json
{
  "data": [
    {
      "id": "2fxUd3nNkMWMZLWp",
      "date": "2024-10-10",
      "amount": 280000,
      "item": "給与",
      "balance_type": "income"
    },
    {
      "id": "KMpBM38HwHZhM9kY",
      "date": "2024-10-15",
      "amount": 5000,
      "item": "電気代",
      "balance_type": "expense"
    },

    {
      "id": "NdJrjlTCriTJUBfd",
      "date": "2024-10-21",
      "amount": 10000,
      "item": "飲み代",
      "balance_type": "expense"
    },
  ]
}
```

