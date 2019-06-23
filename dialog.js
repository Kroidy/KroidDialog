(function (window){
    window.KroidDialog = window.KroidDialog ||{};

    function createDialog(configuration) {
        var maskLayer = document.createElement('div'); //遮罩层
        maskLayer.classList.add('dialog-mask-layer');

        var dialogPanel = document.createElement('div'); //弹框区域
        dialogPanel.classList.add('dialog-panel');

        var dialogContainer = document.createElement('div'); //弹框容器
        dialogContainer.classList.add('dialog-container');
        dialogContainer.style.width = configuration.width + 'px';
        dialogContainer.style.height = configuration.height + 'px';

        var containerHeader = document.createElement('div'); //弹框容器头部区域
        var containerHeaderTitle = document.createElement('div'); //弹框容器头部标题
        var containerHeaderClose = document.createElement('div'); //弹框容器头部关闭按钮
        containerHeader.classList.add('dialog-header');

        containerHeaderTitle.classList.add('dialog-header-title');
        containerHeaderTitle.innerText = configuration.title;

        containerHeaderClose.classList.add('dialog-header-close');
        if (configuration.iconUrl) {
            containerHeaderClose.style.backgroundImage = configuration.iconUrl;
        } else {
            containerHeaderClose.innerText = configuration.iconUrl;
        }
        containerHeaderClose.onclick = function () {
            var closeFlag = true;
            if (configuration.onClose && typeof configuration.onClose === 'function') {
                closeFlag = configuration.onClose();
            }
            if (closeFlag) {
                dialogPanel.parentNode.removeChild(dialogPanel);
                maskLayer.parentNode.removeChild(maskLayer);
            }
        }
        containerHeader.appendChild(containerHeaderClose);
        containerHeader.appendChild(containerHeaderClose);

        var containerContent = document.createElement('div'); //弹框容器中部内容区域
        containerContent.classList.add('dialog-content');
        var iframe = document.createElement('iframe');
        iframe.src = configuration.url;
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("frameborder", 0);
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        containerContent.appendChild(iframe);

        var containerFooter = document.createElement('div'); //弹框容器底部区域
        containerFooter.classList.add('dialog-footer');
        for (var buttonInfo of configuration.buttons) {
            var button = document.createElement('input');
            button.type = 'button';
            button.className = buttonInfo.className;
            button.onclick = buttonInfo.handler;
            containerFooter.appendChild(button);
        }

        containerHeader.appendChild(containerHeader);
        dialogContainer.appendChild(containerContent);
        dialogContainer.appendChild(containerFooter);
        dialogPanel.appendChild(dialogContainer);
    }

    window.KroidDialog.customDialog = function (url, title, options) {
        if (!url) {
            return;
        }
        var configuration = {
            width: options.width || 1000,
            height: options.height || 800,
            title: title || '自定义对话框',
            closeIcon: options.iconUrl || '×',
            onCancel: options.onCancel || function (){},
            onClose: options.onClose || function (){},
            onConfirm: options.onConfirm || function () {},
            buttons: options.buttons || []
        };
        createDialog(configuration);
    }


})(window);
