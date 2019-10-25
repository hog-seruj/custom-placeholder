Drupal.behaviors.customPlaceholder = {
  attach: function (context) {
    let options = [
      {
        'wrapper': '.view--articles-catalog .view__filters .form-item.form-type-textfield',
        'input': 'input.form-text'
      },
      {
        'wrapper': '.view--catalog .view__filters .form-item.form-type-textfield',
        'input': 'input.form-text'
      },
    ];

    for (let i = 0; i < options.length; i++) {
      this.init(options[i].wrapper, options[i].input, context);
    }
  },
  init: function (wrapper, input, context) {
    let self = this;
    Array.prototype.slice.call(context.querySelectorAll(wrapper)).forEach(function (wrapper) {
      wrapper.style.position = 'relative';
      let thisInput = wrapper.querySelector(input);
      let placeholderVal = thisInput.getAttribute('placeholder');

      if (!wrapper.classList.contains('initialized')) {
        wrapper.insertAdjacentHTML('beforeend', '<div class="custom-placeholder">' + placeholderVal + '</div>');
        wrapper.classList.add('initialized');
      }

      let placeholder = wrapper.querySelector('.custom-placeholder');

      thisInput.setAttribute('placeholder', '');

      self.checkInputValue(thisInput, placeholder);

      placeholder.addEventListener('click', function () {
        self.hidePlaceholder(placeholder);
        thisInput.focus();
      });

      placeholder.addEventListener('touch', function () {
        self.hidePlaceholder(placeholder);
        thisInput.focus();
      });

      wrapper.addEventListener('focus', function () {
        self.checkInputValue(thisInput, placeholder);
      });

      wrapper.addEventListener('blur', function () {
        self.checkInputValue(thisInput, placeholder);
      });

      thisInput.addEventListener('focus', function () {
        self.checkInputValue(thisInput, placeholder);
      });

      thisInput.addEventListener('blur', function () {
        self.checkInputValue(thisInput, placeholder);
      });

      thisInput.addEventListener('keydown', function () {
        self.checkInputValue(thisInput, placeholder);
      });
    });
  },
  checkInputValue: function (input, placeholder) {
    if (input.value.length > 0 || document.activeElement === input ) {
      this.hidePlaceholder(placeholder);
    }
    else {
      this.showPlaceholder(placeholder);
    }
  },
  hidePlaceholder: function (placeholder) {
    placeholder.classList.add('hidden');
  },
  showPlaceholder: function (placeholder) {
    placeholder.classList.remove('hidden');
  },
}