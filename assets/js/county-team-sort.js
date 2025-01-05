(function () {
    function comparator(a, b) {
      if (+a.dataset.order < +b.dataset.order) {
        return -1;
      }
      if (+a.dataset.order > +b.dataset.order) {
        return 1;
      }
      return 0;
    }

    function sortMembers() {
      const sections = document.querySelectorAll(".county-team-section");
      sections.forEach(function (section) {
        const members = section.querySelectorAll("[data-order]");
        const memberArray = Array.from(members);
        let sorted = memberArray.sort(comparator);
        sorted.forEach(e=>section.appendChild(e));
      });
    }
    sortMembers();
  })();