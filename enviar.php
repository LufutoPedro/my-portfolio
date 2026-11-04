<?php
// Exibir erros para testes (desative em produção)
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Dados do Formulário
    $nome = strip_tags(trim($_POST['nome']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $assunto_form = strip_tags(trim($_POST['assunto']));
    $mensagem = nl2br(htmlspecialchars($_POST['mensagem']));

    // 2. Configurações de Destino
    $para = "pedrolufuto944@gmail.com";
    $assunto = "ASSUNTO: " . $assunto_form;

    // 3. Configurações de Header para evitar Spam
    // IMPORTANTE: O 'From' DEVE ser um e-mail criado no seu cPanel
    $email_autenticado = "pedro.lufuto@vibeagency.ao";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Portfolio | Pedro Miguel  <$email_autenticado>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "Return-Path: $email_autenticado" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 4. Montagem do corpo em HTML (mais profissional)
    $corpo = "
    <html>
    <head><title>$assunto</title></head>
    <body style='font-family: Arial; line-height: 1.6;'>
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> $nome</p>
        <p><strong>E-mail:</strong> $email</p>
        <p><strong>Assunto:</strong> $assunto_form</p>
        <hr>
        <p><strong>Mensagem:</strong><br>$mensagem</p>
    </body>
    </html>
    ";

    // 5. Envio
    if (mail($para, $assunto, $corpo, $headers)) {
        echo "<script>alert('Mensagem enviada com sucesso!'); window.location.href='index.html';</script>";
    } else {
        // Se falhar, tentamos um envio simples sem HTML como plano B
        mail($para, $assunto, strip_tags($corpo), "From: $email_autenticado");
        echo "<script>alert('Enviado com formatação simples.'); window.location.href='index.html';</script>";
    }
}
?>