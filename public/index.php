<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
<script src="/../node_modules/jquery/dist/jquery.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<button class="btn btn-success" id="getButton" onclick="get()">GET</button>

    <pre id="getResponse"> </pre>
    <script>
        function get(){
            $.ajax({
                type : 'GET',
                url : 'http://localhost:3000/ajaxcall',
                dataType: 'json'
            })
            .done(function(data){
                console.log('GET response:', JSON.stringify(data, "", 2));
                $('#getResponse').html(JSON.stringify(data, "", 2));
            })
            .fail(function(jqXHR, textStatus, err){
                console.log('AJAX error response:', textStatus);
            });
        }
    </script>
</body>
</html>