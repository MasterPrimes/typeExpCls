Router処理をクラス化する
コーディングをしやすくするためにデコレータを使用する

【必要ライブラリ】
yarn add reflect-metadata

【作成手順】
１．デコレータを使用できるように設定を行う
① tsconfig.json
  compilerOptionsに以下の設定を追加する
  
  "experimentalDecorators": true,

【仕様】
デコレータの仕様としては、とりあえず以下のものとする

１．Pathデコレータ
Routerクラスに指定する

２．Get/Post/Putデコレータ
各メソッド処理で指定するデコレータ
引数にパスを指定する

【備考】
今後必要に応じて、機能の拡張を行っていく
現状はGET/POST/PUTのみの対応とする
