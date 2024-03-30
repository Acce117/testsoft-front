import {
    defineConfig,
    presetTypography,
    presetAttributify,
    presetUno
} from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetTypography(),
        presetAttributify()
    ],
    rules: [
        [/^anim-([^\s]+)-([\.\d]+)$/, ([_, name, num]) => ({ 'animation': `${name} ${num}s` }),],
        [/^trans-([\.\d]+)$/, ([_, num]) => ({ 'transition': `all ease ${num}s` }),],
        [
            'page-title', {
                'color': 'white',
                'text-align': 'center',
                'animation': '.8s fade-in',
                'margin-top': '7rem',
                'font-size': '2rem'
            }
        ],
        [
            'page-subtitle', {
                'color': 'white',
                'text-align': 'center',
                'animation': '.8s fade-in',
                'font-size': '2rem'
            }],

        [
            'shadow-box', {
                'box-shadow': 'var(--shadow)',
                'background-color': 'white',
                'border-radius': 'var(--bradius)'
            }],
            [
                'shadow', {
                    'box-shadow': 'var(--shadow)',
                }],
        [
            'black-button', {
                'background-color': 'black',
                'color': 'white',
                'padding': '1rem'
            }],
        [
            'white-button', {
                'background-color': 'white',
                'color': 'black',
                'box-shadow': 'var(--shadow)',
                'padding': '1rem'

            }
        ],
        [
            'centered', {
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center'
            }]
    ],
})