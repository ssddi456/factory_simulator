define([
  'knockout'
],function(
  ko
){
  ko.bindingHandlers.withfirst = {
    'init' : function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      var didDisplayOnLastUpdate,
        savedNodes;
        ko.computed(function() {
          var dataValue = ko.utils.unwrapObservable(valueAccessor());
          var shouldDisplay = (!dataValue) || typeof dataValue.length == "number";
          var isFirstRender = !savedNodes;
          var needsRefresh = isFirstRender || (shouldDisplay !== didDisplayOnLastUpdate);

          // Save a copy of the inner nodes on the initial update, 
          // but only if we have dependencies.
          if (isFirstRender && ko.computedContext.getDependenciesCount()) {
            savedNodes = ko.utils.cloneNodes(ko.virtualElements.childNodes(element), true /* shouldCleanNodes */);
          }

          if (shouldDisplay) {
            if (!isFirstRender) {
              ko.virtualElements.setDomNodeChildren(element, ko.utils.cloneNodes(savedNodes));
            }
            ko.applyBindingsToDescendants(  bindingContext['createChildContext'](dataValue && dataValue[0]), element);
          } else {
            ko.virtualElements.emptyNode(element);
          }

          didDisplayOnLastUpdate = shouldDisplay;
        }, null).extend({ rateLimit: 50 });
      return { 'controlsDescendantBindings': true };
    }
  }
});