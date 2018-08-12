import os
import shutil

module_path = os.path.join(os.path.dirname(__file__), 'node_modules')
vendor_path = os.path.join(os.path.dirname(__file__), 'app/static/vendors')

if os.path.exists(vendor_path):
    shutil.rmtree(vendor_path)

if os.path.exists(module_path):
    shutil.rmtree(module_path)

os.system('npm install')
os.mkdir(vendor_path)

mj_path = lambda name: os.path.join(module_path, name)
vj_path = lambda name: os.path.join(vendor_path, name)


def mk_bunch_dirs(*paths):
    for path in paths:
        os.mkdir(path)
        os.mkdir(os.path.join(path, 'js'))
        os.mkdir(os.path.join(path, 'css'))
        os.mkdir(os.path.join(path, 'img'))
        os.mkdir(os.path.join(path, 'fonts'))


mk_bunch_dirs(*map(vj_path, ['animate', 'font-awesome', 'bootstrap',
                             'vue', 'axios', 'jquery', 'popper']))

# animate
os.system(f'cp {mj_path("animate.css/*.css")} {vj_path("animate/css")}')

# axios
os.system(f'cp {mj_path("axios/dist/*")} {vj_path("axios/js")}')

# bootstrap
os.system(f'cp {mj_path("bootstrap/dist/css/*")} {vj_path("bootstrap/css")}')
os.system(f'cp {mj_path("bootstrap/dist/js/*")} {vj_path("bootstrap/js")}')

# font-awesome
os.system(f'cp {mj_path("font-awesome/css/*")} {vj_path("font-awesome/css")}')
os.system(f'cp {mj_path("font-awesome/fonts/*")} {vj_path("font-awesome/fonts")}')

# jquery
os.system(f'cp {mj_path("jquery/dist/*")} {vj_path("jquery/js")}')

# popper
os.system(f'cp -r {mj_path("popper.js/dist/*")} {vj_path("popper/js")}')

# vue
os.system(f'cp  {mj_path("vue/dist/*")} {vj_path("vue/js")}')

# remove node_modules
shutil.rmtree(module_path)
