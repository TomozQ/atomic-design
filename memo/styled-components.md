# styled-componentsによるスタイル実装

styled-components → __CSS in JS__ と呼ばれるライブラリの1つでJavaScript内にCSSを効率的に書くためのもの。

* コンポーネントと同じファイルでスタイルを実装する。
* CSSファイルを作成して別のファイルで記述する必要がなく、CSSと同じ表現力でスタイルを定義できる。
* __styled-components__ で定義したスタイルは実行時にユニークなクラス名が設定され、対象のコンポーネントのみにスタイルが適用される。
* styled-componentsを用いるとJavaScript/TypeScriptのコード、HTMLタグ、スタイルを1つのコンポーネントにまとめることができ、__管理が容易になる__ 。