```js
$(".wjiframe").remove();
data.forEach((item, i) => {
  $("body").append(
    '<iframe style="width:1px;height:1px" class="wjiframe download' +
      i +
      '" src=""></iframe>'
  );
  $(".download" + i).attr("src", item.addr);
});
```