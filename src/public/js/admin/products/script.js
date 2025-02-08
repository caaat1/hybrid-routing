(function () {
  const px = 'px',
    an = 'animated',
    bD = 'bnDragged',
    mv = 'moving',
    mD = 'mseDn',
    doc = document,
    minDur = 0.1,
    maxDur = 5;
  // trans_dur.max = max_dur.innerText = maxDur;
  // trans_dur.min = trans_dur.step = min_dur.innerText = minDur;
  // trans_dur.value = maxDur / 4;
  var dragged,
    isGrabbed = (zInd = z_base = 0),
    tmOut,
    gCS = getComputedStyle;
  (transDur = (_) => {
    [...doc.styleSheets].forEach((item) =>
      (transDurRule = Object.values(item.cssRules).find(
        (a) => a.selectorText == '.' + an,
      ))
        ? (transDurRule.style.transitionDuration = disp_transDur.innerText =
            `${trans_dur.value}s`)
        : void 0,
    );
  })();
  items = list.querySelectorAll('.item');
  items.forEach((item) => {
    item.classList.add((item.transEnded = an));
    item.ontransitionend = (_) => {
      item.style.removeProperty((item.transEnded = 'top'));
      item.classList.remove(bD, mv);
    };
    item.onmousedown = (e) => {
      isGrabbed = item.transEnded && e.which < 2;
      if (isGrabbed) {
        bnDragged = (cL = item.classList).add(mD);
        dS = (dragged = item).style;
        mse_Start_X = e.pageX;
        mse_Start_Y = e.pageY;
      }
    };
  });
  doc.onmousemove = (e) =>
    isGrabbed &&
    (bnDragged
      ? ([0, 2].forEach((k, i) => {
          if (
            (a = (c = [
              dragged.previousElementSibling,
              dragged,
              dragged.nextElementSibling,
            ])[k--]) &&
            c[i].offsetTop + (c[i++].offsetHeight - c[i].offsetHeight) / 2 >
              c[i].offsetTop &&
            a.transEnded
          ) {
            oHmT = (a) => (a.offsetHeight + parseFloat(gCS(a).marginTop)) * k;
            list.insertBefore(c[i], c[--i]);
            a.style.top = oHmT(dragged) + px;
            a.transEnded = a.classList.add(mv);
            mse_Start_Y += oHmT(a);
            a.style.top = 0;
          }
        }),
        (dS.left = e.pageX - mse_Start_X + px),
        (dS.top = e.pageY - mse_Start_Y + px))
      : (dS.zIndex =
          zInd +=
          bnDragged =
            (Math.abs(e.pageX - mse_Start_X) + Math.abs(e.pageY - mse_Start_Y) >
              4) &
            !cL.remove(an)));
  doc.onmouseup = (_) =>
    isGrabbed &&
    setTimeout((_) => {
      if (bnDragged)
        dragged.transEnded = dS.top =
          cL.add(bD, an) |
          (setTimeout(
            () =>
              (zInd -=
                items.forEach(
                  (a) =>
                    (a.style.zIndex = gCS(a).zIndex - (gCS(a).zIndex > z_base)),
                ) |
                (zInd > z_base)),
            (tmOut = trans_dur.value * 1e3),
          ) &
            0);
      dS.left = isGrabbed = cL.remove(mD) | 0;
    }, 10);
  doc.oncontextmenu = (e) => e.preventDefault();
})();
