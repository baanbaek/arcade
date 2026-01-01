/*:
 * @plugindesc Simple Event Name Display (Above Event)
 * @author ChatGPT
 * @help
 * 이벤트 메모에 <Name:이름> 을 입력하면
 * 이벤트 머리 위에 작은 이름을 표시합니다.
 */

(function() {

const FONT_SIZE = 12;
const Y_OFFSET = -32;
const WIDTH = 96;
const HEIGHT = 24;

const _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function(character) {
    _Sprite_Character_initialize.call(this, character);
    this.createNameSprite();
};

Sprite_Character.prototype.createNameSprite = function() {
    this._nameSprite = new Sprite(new Bitmap(WIDTH, HEIGHT));
    this._nameSprite.bitmap.fontSize = FONT_SIZE;
    this._nameSprite.anchor.x = 0.5;
    this._nameSprite.anchor.y = 1;
    this._nameSprite.x = 0;
    this._nameSprite.y = Y_OFFSET;
    this.addChild(this._nameSprite);
};

const _Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.call(this);
    this.updateNameSprite();
};

Sprite_Character.prototype.updateNameSprite = function() {
    if (!this._character || !this._character.event) return;

    const event = this._character.event();
    if (!event) return;

    const match = event.note.match(/<Name:(.+?)>/);
    if (!match) {
        this._nameSprite.visible = false;
        return;
    }

    const name = match[1];
    const bitmap = this._nameSprite.bitmap;

    bitmap.clear();
    bitmap.drawText(name, 0, 0, WIDTH, HEIGHT, 'center');
    this._nameSprite.visible = true;
};

})();
