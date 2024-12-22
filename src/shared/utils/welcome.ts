export function welcome(port: number): void {
  console.log(
    '\x1b[31m',
    `
   ▄▄▄▄███▄▄▄▄      ▄██████▄     ▄████████ 
 ▄██▀▀▀███▀▀▀██▄   ███    ███   ███    ███ 
 ███   ███   ███   ███    █▀    ███    █▀  
 ███   ███   ███  ▄███         ▄███▄▄▄     
 ███   ███   ███ ▀▀███ ████▄  ▀▀███▀▀▀     
 ███   ███   ███   ███    ███   ███    █▄  
 ███   ███   ███   ███    ███   ███    ███ 
  ▀█   ███   █▀    ████████▀    ██████████

                        Welcome to mge-api
                 Made by David Saldarriaga
                                Port: ${port}`,
    '\x1b[0m',
  );
}
