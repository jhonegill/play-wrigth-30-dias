import { expect, test } from "@playwright/test"

// Definición de la prueba automatizada
test('Get all the usernames registered', async ({ page }) => {

    // 1. PROCESO DE INICIO DE SESIÓN (LOGIN)
    // Navega a la página web de pruebas de OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/')
    
    // Busca el campo de texto de usuario por su rol y escribe 'Admin'
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    
    // Busca el campo de texto de contraseña por su rol y escribe 'admin123'
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    
    // Busca el botón de inicio de sesión por su rol y hace clic en él
    await page.getByRole('button', { name: 'Login' }).click()

    // 2. VERIFICACIÓN Y NAVEGACIÓN AL MÓDULO DE ADMINISTRACIÓN
    // Validación de seguridad: Espera a que el enlace 'Admin' sea visible para confirmar el login exitoso
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    // Hace clic en la opción 'Admin' del menú lateral izquierdo
    await page.getByRole('link', { name: 'Admin' }).click()

    // 3. NAVEGACIÓN EN EL MENÚ SUPERIOR (TOPBAR)
    // Dentro de la barra de navegación superior, busca y hace clic en el menú desplegable 'User Management'
    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
    
    // Hace clic en la opción 'Users' del submenú desplegable
    await page.getByRole('menuitem', { name: 'Users' }).click()

    // 4. EXTRACCIÓN DE DATOS DE LA TABLA (WEB SCRAPING)
    // Localiza la tabla y obtiene una referencia de todas las filas (<tr>) presentes
    const rows = page.getByRole('table').getByRole('row')
    
    // Inicializa un array vacío para almacenar los nombres de usuario recolectados
    const usernames: string[] = []

    // Obtiene de forma asíncrona la cantidad total de filas en la tabla
    const rowCount = await rows.count()

    // Ciclo para recorrer cada fila de la tabla
    // Nota: Empezamos en i = 1 porque la fila 0 corresponde a los encabezados de la tabla (las columnas)
    for (let i = 1; i < rowCount; i++) {

        // Selecciona la fila número 'i' y de ella toma la segunda celda (índice 1), que contiene el 'Username'
        const cell = rows.nth(i).getByRole('cell').nth(1)
        
        // Extrae el texto plano que se encuentra dentro de esa celda
        const username = await cell.textContent()

        // Si la celda contenía texto (no está vacía o nula), añade el usuario a la lista
        if (username) {
            usernames.push(username)
        }
    }

    // 5. SALIDA DE RESULTADOS
    // Imprime en la consola de la terminal la lista completa de usuarios extraídos
    console.log(usernames)

})


test('Get all the employee names registered', async ({ page }) => {

    // 1. PROCESO DE INICIO DE SESIÓN (LOGIN)
    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

    // 2. VERIFICACIÓN Y NAVEGACIÓN AL MÓDULO DE ADMINISTRACIÓN
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    await page.getByRole('link', { name: 'Admin' }).click()

    // 3. NAVEGACIÓN EN EL MENÚ SUPERIOR (TOPBAR)
    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    // 4. EXTRACCIÓN DE DATOS DE LA COLUMNA EMPLOYEE NAME
    const rows = page.getByRole('table').getByRole('row')
    
    // Cambiamos el nombre de la lista para reflejar que guardaremos empleados
    const employeeNames: string[] = []
    const rowCount = await rows.count()

    for (let i = 1; i < rowCount; i++) {
        // CAMBIO CLAVE: Usamos .nth(2) para apuntar a la columna 'Employee Name'
        const cell = rows.nth(i).getByRole('cell').nth(3)
        const employeeName = await cell.textContent()

        // Si la celda contiene texto, la limpiamos de espacios y la agregamos a la lista
        if (employeeName) {
            employeeNames.push(employeeName.trim())
        }
    }

    // 5. SALIDA DE RESULTADOS
    // Imprimirá: ['AdminAuto User', 'Fabian Johns', 'Autovnfjs User', ...]
    console.log(employeeNames)

})