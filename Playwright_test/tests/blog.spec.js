

const { test, expect, beforeEach, describe } = require('@playwright/test');
import axios from 'axios';

/*
describe('mostrar el inicio de secion visible', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173'); // Asegúrate de que esta URL es correcta
  });

  test('Login form is shown', async ({ page }) => {
    // Verificar que el formulario de inicio de sesión se muestra por defecto
    await expect(page.locator('text=LoginForm')).toBeVisible();

    // Verificar que los campos de nombre de usuario y contraseña están presentes
    await expect(page.locator('input[name="Username"]')).toBeVisible();
    await expect(page.locator('input[name="Password"]')).toBeVisible();

    // Verificar que el botón de inicio de sesión está presente
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});
*/

/*
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Vacía la base de datos
    await axios.post('http://localhost:3003/api/testing/reset');

    // Crea un nuevo usuario
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'password123'
    };

    await axios.post('http://localhost:3003/api/login', newUser);

    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    // Verificar que el formulario de inicio de sesión se muestra por defecto
    await expect(page.locator('text=LoginForm')).toBeVisible();

    // Verificar que los campos de nombre de usuario y contraseña están presentes
    await expect(page.locator('input[name="Username"]')).toBeVisible();
    await expect(page.locator('input[name="Password"]')).toBeVisible();

    // Verificar que el botón de inicio de sesión está presente
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // Completar el formulario de inicio de sesión con credenciales correctas
      await page.fill('input[name="Username"]', 'testuser');
      await page.fill('input[name="Password"]', 'password123');
      await page.click('button[type="submit"]');

      // Verificar que el inicio de sesión fue exitoso (dependiendo de cómo se maneja en la aplicación)
      await expect(page.locator('text=Logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      // Completar el formulario de inicio de sesión con credenciales incorrectas
      await page.fill('input[name="Username"]', 'testuser');
      await page.fill('input[name="Password"]', 'wrongpassword');
      await page.click('button[type="submit"]');

      // Verificar que el inicio de sesión falló (dependiendo de cómo se maneja en la aplicación)
      await expect(page.locator('text=Wrong username or password')).toBeVisible();
    });
  });
});
*/

/*
describe('Blog app', () => {
  beforeEach(async ({ page }) => {

    try{ 
    // Vacía la base de datos
    await axios.post('http://localhost:3003/api/testing/reset')

    // Crea un nuevo usuario
    const newUser = {
      username: 'testuser',
      name: 'Test User',  
      password: 'testpassword',
    }

    const a = await axios.post('http://localhost:3003/api/users', newUser)
    //console.log('hola', a)

    const response = await axios.post('http://localhost:3003/api/login', {
      username: 'testuser',
      password: 'testpassword',
    });
//console.log('login',response)

 
    await page.goto('http://localhost:5173')
  } catch (error) {
    console.error('Error during setup:', error)
  }
  })

   

test('El formulario de inicio de sesión se muestra', async ({ page }) => {

  // Verificar que los campos de nombre de usuario y contraseña están presentes
  await expect(page.locator('input[name="Username"]')).toBeVisible();
  await expect(page.locator('input[name="Password"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      
      
      await page.fill('input[name="Username"]', 'testuser',  ) 
      await page.fill('input[name="Password"]', 'testpassword',) 
      
       
      
      await page.click('button[type="submit"]') 

      // Añade aserciones específicas según lo que debería ocurrir en tu aplicación después del login exitoso
      //await expect(page.getByText('logged in')).toBeVisible()
      //await expect(page.locator('message=Logout exitoso')).toBeVisible();

      await page.waitForSelector('text=Login exitoso', { timeout: 10000 });

      // Añade aserciones específicas según lo que debería ocurrir en tu aplicación después del login exitoso
      await expect(page.locator('text=Login exitoso')).toBeVisible();

    })

    
    test('fails with wrong credentials', async ({ page }) => {
      await page.fill('input[name="Username"]', 'testuser')
      await page.fill('input[name="Password"]', 'wrongpassword')
      await page.click('button[type="submit"]')

      
      await expect(page.locator('text=Error en el inicio de sesión')).toBeVisible();

      // Añade aserciones específicas según lo que debería ocurrir en tu aplicación después del login fallido
      //await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })
})
*/


describe('login Blog', () => {
  beforeEach(async ({ page, request }) => {
    // Vacía la base de datos
    await request.post('http://localhost:3003/api/testing/reset');

    // Crea un nuevo usuario
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'testuser',
        name: 'Test User',
        password: 'password123',
      },
    });

    // Navega a la página principal
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    // Verifica que el formulario de inicio de sesión se muestra
    await expect(page.locator('text=username')).toBeVisible();
    await expect(page.locator('text=password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
       
      // Rellena el formulario de inicio de sesión
      await page.fill('input[name="Username"]', 'testuser');
      await page.fill('input[name="Password"]', 'password123');

      // Envía el formulario
      await page.click('button[type="submit"]');

      await expect(page.locator('text=Login exitoso')).toBeVisible();
      
    });

    test('fails with wrong credentials', async ({ page }) => {
      // Rellena el formulario de inicio de sesión con credenciales incorrectas
      await page.fill('input[name="Username"]', 'testuser');
      await page.fill('input[name="Password"]', 'wrongpassword');

      // Envía el formulario
      await page.click('button[type="submit"]');

      // Verifica que se muestra un mensaje de error
      await expect(page.locator('text=Error en el inicio de sesión')).toBeVisible();
    });

  });
 
});



describe('create blog', () => {
  beforeEach(async ({ page, request }) => {
    // Vacía la base de datos
    await request.post('http://localhost:3003/api/testing/reset');

    // Crea un nuevo usuario
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'testuser',
        name: 'Test User',
        password: 'password123',
      },
    });

    // Navega a la página principal
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    // Verifica que el formulario de inicio de sesión se muestra
    await expect(page.locator('text=username')).toBeVisible();
    await expect(page.locator('text=password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });



  describe('Login', () => {
    test('a new blog can be created', async ({ page }) => {
       
      // Rellena el formulario de inicio de sesión
      await page.fill('input[name="Username"]', 'testuser');
      await page.fill('input[name="Password"]', 'password123');

      // Envía el formulario
      await page.click('button[type="submit"]');

      await expect(page.locator('text=Login exitoso')).toBeVisible();
      
      /////

      await page.click('.newblog');
     
    // Rellena el formulario de creación de blog
    await page.fill('input[name="title"]', 'Test Blog Title');
    await page.fill('input[name="author"]', 'Test Author');
    await page.fill('input[name="url"]', 'http://testblog.com');

    // Envía el formulario       
    await page.click('button[type="submit"]');

    //hacer click para mostrar el blog creado
    await page.click('text=view')

    // Verifica que el nuevo blog aparece en la lista de blogs

    

    await expect(page.locator('text=userName testuser')).toBeVisible();
    await expect(page.locator('text=titulo Test Blog Title')).toBeVisible();
    await expect(page.locator('button:has-text("hide")')).toBeVisible();
    await expect(page.locator('text=http://testblog.com')).toBeVisible();
    await expect(page.locator('text=author Test Author')).toBeVisible();
    await expect(page.locator('text=likes 0')).toBeVisible();
    await expect(page.locator('button:has-text("remove")')).toBeVisible();

       
    });

    
    test('actualizar likes', async ({ page }) => {
      
       
      // Rellena el formulario de inicio de sesión
      await page.fill('input[name="Username"]', 'testuser');
      await page.fill('input[name="Password"]', 'password123');

      // Envía el formulario
      await page.click('button[type="submit"]');

      await expect(page.locator('text=Login exitoso')).toBeVisible();
      
      /////

      await page.click('.newblog');
     
    // Rellena el formulario de creación de blog
    await page.fill('input[name="title"]', 'Test Blog Title');
    await page.fill('input[name="author"]', 'Test Author');
    await page.fill('input[name="url"]', 'http://testblog.com');

    // Envía el formulario       
    await page.click('button[type="submit"]');



    //hacer click para mostrar el blog creado
    await page.click('text=view')

     
    //actualizar likes
    await page.click('text=likes')
      await expect(page.locator('text=likes 1')).toBeVisible();
       
    });
  });
});



 ///

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Vacía la base de datos
    await request.post('http://localhost:3003/api/testing/reset');

    // Crea un nuevo usuario
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'testuser',
        name: 'Test User',
        password: 'password123',
      },
    });

    // Navega a la página principal
    await page.goto('http://localhost:5173/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('input[name="Username"]')).toBeVisible();
    await expect(page.locator('input[name="Password"]')).toBeVisible();
  });

  describe('Login', () => {
    /*
    test('a new blog can be created', async ({ page }) => {
      // Rellena el formulario de inicio de sesión
      await page.fill('input[name="Username"]', 'testuser');
      await page.fill('input[name="Password"]', 'password123');

      // Envía el formulario
      await page.click('button[type="submit"]');

      // Verifica que el inicio de sesión fue exitoso
      await expect(page.locator('text=Login exitoso')).toBeVisible();

      // Haz clic en el botón para mostrar el formulario de creación de blogs
      await page.click('.newblog');

      // Rellena el formulario de creación de blog
      await page.fill('input[name="title"]', 'Test Blog Title');
      await page.fill('input[name="author"]', 'Test Author');
      await page.fill('input[name="url"]', 'http://testblog.com');

      // Envía el formulario
      await page.click('button[type="submit"]');

      // Verifica que el nuevo blog aparece en la lista de blogs
      await expect(page.locator('text=Test Blog Title')).toBeVisible();
      await expect(page.locator('text=Test Author')).toBeVisible();
      await expect(page.locator('text=http://testblog.com')).toBeVisible();

      // Haz clic en el botón "view" para mostrar los detalles del blog
      await page.click('text=view');

      // Verifica que los detalles del blog son visibles
      await expect(page.locator('text=titulo Test Blog Title')).toBeVisible();
      await expect(page.locator('text=http://testblog.com')).toBeVisible();
      await expect(page.locator('text=author Test Author')).toBeVisible();
      await expect(page.locator('text=likes 0')).toBeVisible(); // Assuming initial likes is 0

      // Verifica que el botón "hide" es visible
      await expect(page.locator('button:has-text("hide")')).toBeVisible();

      // Haz clic en el botón "hide"
      await page.click('button:has-text("hide")');
      
      // Opcional: Verifica que los detalles se ocultan después de hacer clic en "hide"
      await expect(page.locator('text=titulo Test Blog Title')).toBeHidden();
    });
*/

    test('the creator can delete a blog', async ({ page }) => {
      // Rellena el formulario de inicio de sesión
      await page.fill('input[name="Username"]', 'testuser');
      await page.fill('input[name="Password"]', 'password123');

      // Envía el formulario
      await page.click('button[type="submit"]');

      // Verifica que el inicio de sesión fue exitoso
      await expect(page.locator('text=Login exitoso')).toBeVisible();

      // Haz clic en el botón para mostrar el formulario de creación de blogs
      await page.click('.newblog');

      // Rellena el formulario de creación de blog
      await page.fill('input[name="title"]', 'Test Blog Title');
      await page.fill('input[name="author"]', 'Test Author');
      await page.fill('input[name="url"]', 'http://testblog.com');

      // Envía el formulario
      await page.click('button[type="submit"]');

      
      // Haz clic en el botón "view" para mostrar los detalles del blog
      await page.click('text=view');

      // Verifica que los detalles del blog son visibles
      await expect(page.locator('text=titulo Test Blog Title')).toBeVisible();
      await expect(page.locator('text=http://testblog.com')).toBeVisible();
      await expect(page.locator('text=author Test Author')).toBeVisible();
      await expect(page.locator('text=likes 0')).toBeVisible(); // Assuming initial likes is 0

      // Haz clic en el botón "remove" y maneja el diálogo de confirmación
      page.on('dialog', dialog => dialog.accept());
      await page.click('button:has-text("remove")');

      // Verifica que el blog ya no está en la lista
      //await expect(page.locator('text=Test Blog Title')).not.toBeVisible();
    });

    test('only the creator can see the delete button', async ({ page, request }) => {
      // Rellena el formulario de inicio de sesión
      await page.fill('input[name="Username"]', 'testuser');
      await page.fill('input[name="Password"]', 'password123');

      // Envía el formulario
      await page.click('button[type="submit"]');

      // Verifica que el inicio de sesión fue exitoso
      await expect(page.locator('text=Login exitoso')).toBeVisible();

      // Haz clic en el botón para mostrar el formulario de creación de blogs
      await page.click('.newblog');

      // Rellena el formulario de creación de blog
      await page.fill('input[name="title"]', 'Test Blog Title');
      await page.fill('input[name="author"]', 'Test Author');
      await page.fill('input[name="url"]', 'http://testblog.com');

      // Envía el formulario
      await page.click('button[type="submit"]');

      await page.click('.newblog');
      // Cierra sesión
      await page.click('button:has-text("cerrar sesion")');

      // Crea otro usuario
      await request.post('http://localhost:3003/api/users', {
        data: {
          username: 'anotheruser',
          name: 'Another User',
          password: 'password123',
        },
      });

      // Inicia sesión con el nuevo usuario
      await page.fill('input[name="Username"]', 'anotheruser');
      await page.fill('input[name="Password"]', 'password123');
      await page.click('button[type="submit"]');

      // Haz clic en el botón "view" para ver los detalles del blog creado por el primer usuario
      await page.click('text=view');

      // Verifica que el botón "remove" no está visible para el nuevo usuario
      await expect(page.locator('button:has-text("remove")')).not.toBeVisible();
    });
  });
});


///

describe('ordenar likes', () => {
  beforeEach(async ({ page, request }) => {
    // Vacía la base de datos
    await request.post('http://localhost:3003/api/testing/reset');

    // Crea un nuevo usuario
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'testuser',
        name: 'Test User',
        password: 'password123',
      },
    });

    // Navega a la página principal
    await page.goto('http://localhost:5173/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('input[name="Username"]')).toBeVisible();
    await expect(page.locator('input[name="Password"]')).toBeVisible();
  });

  describe('ordenar likes', () => {

    /*
    test('los blogs están ordenados según los likes en orden descendente', async ({ page }) => {
      // Iniciar sesión como testuser
      //await page.goto('http://localhost:3000');
      await page.fill('input[name="Username"]', 'testuser');
      await page.fill('input[name="Password"]', 'password123');
      await page.click('button[type="submit"]');
  
      // Crear el primer blog
      await page.click('.newblog');
      await page.fill('input[name="title"]', 'Blog One');
      await page.fill('input[name="author"]', 'Author One');
      await page.fill('input[name="url"]', 'http://blogone.com');
      await page.click('button[type="submit"]');

      

       // Añadir likes al primer blog
    let blog = await page.locator('.blog:has-text("Blog One")');
    await blog.locator('text=view').click();
    for (let i = 0; i < 5; i++) {
      await blog.locator('button:has-text("likes")').click();
    }
  
      // Crear el segundo blog
      await page.click('.newblog');
      await page.fill('input[name="title"]', 'Blog Two');
      await page.fill('input[name="author"]', 'Author Two');
      await page.fill('input[name="url"]', 'http://blogtwo.com');
      await page.click('button[type="submit"]');
   
     // Añadir likes al segundo blog
    blog = await page.locator('.blog:has-text("Blog Two")');
    await blog.locator('text=view').click();
    for (let i = 0; i < 10; i++) {
      await blog.locator('text=likes').click();
      //await page.click('text=likes');
    }
  
      // Crear el tercer blog
      await page.click('button#create-blog-button');
      await page.fill('input[name="Title"]', 'Blog Three');
      await page.fill('input[name="Author"]', 'Author Three');
      await page.fill('input[name="URL"]', 'http://blogthree.com');
      await page.click('button#create-button');
  
      // Añadir likes al tercer blog
      await page.click('text=view');
      for (let i = 0; i < 3; i++) {
        await page.click('text=likes');
      }
  
      // Verificar que los blogs están ordenados por likes en orden descendente
      const blogs = await page.$$eval('.blog', blogs => {
        return blogs.map(blog => ({
          title: blog.querySelector('.blog-title').textContent,
          likes: parseInt(blog.querySelector('.blog-likes').textContent.replace('likes ', ''))
        }));
      });
  
      const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);
  
      expect(blogs).toEqual(sortedBlogs);
    });
    */

    test('ensure blogs are ordered by likes', async ({ page }) => {
      // Visita la página de inicio
       
    
      // Realiza el login
      await page.fill('input[name="Username"]', 'testuser');
      await page.fill('input[name="Password"]', 'password123');
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Login exitoso')).toBeVisible();
    
      // Crear el primer blog
      await page.click('.newblog');
      await page.fill('input[name="title"]', 'Blog One');
      await page.fill('input[name="author"]', 'Author One');
      await page.fill('input[name="url"]', 'http://blogone.com');
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Blog agregado exitosamente')).toBeVisible();
    
      // Crear el segundo blog
      await page.click('.newblog');
      await page.fill('input[name="title"]', 'Blog Two');
      await page.fill('input[name="author"]', 'Author Two');
      await page.fill('input[name="url"]', 'http://blogtwo.com');
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Blog agregado exitosamente')).toBeVisible();
    
      // Añadir likes al segundo blog
      const blogTwo = await page.locator('.blog:has-text("Blog Two")');
      await blogTwo.locator('text=view').click();
    
      // Seleccionar específicamente el botón de likes
      /*for (let i = 0; i < 10; i++) {
        await blogTwo.locator('button:text("likes")').click();
      }*/
        for (let i = 0; i < 10; i++) {
          await blogTwo.locator('button:has-text("likes")').click();
        }

        // Esperar un momento para asegurar que los cambios se reflejen
        await page.waitForTimeout(1000);
        
    
      // Verificar que los blogs estén ordenados por likes
      const blogs = await page.locator('.blog');
      const firstBlog = await blogs.nth(0).locator('.blog-title').textContent();
      const secondBlog = await blogs.nth(1).locator('.blog-title').textContent();
      
      expect(firstBlog).toContain('Blog Two');
      expect(secondBlog).toContain('Blog One');
    });
  });
  
});






