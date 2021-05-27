<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- <link rel="icon" href="<%= BASE_URL %>favicon.ico"> -->
      <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <script>
          window.walletTypes = {!! json_encode($walletTypes, JSON_HEX_TAG) !!};
      </script>
    <title>WALLET</title>

  </head>
  <body>

    <noscript>
      <strong>We're sorry but Template doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>

    <div id="root">
    </div>

    <!-- <script src="js/index.js"></script> -->
    <script src="{{ asset(mix('js/index.js')) }}"></script>
  </body>
</html>
