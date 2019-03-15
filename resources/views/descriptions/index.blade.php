<html>
    <head>
        <title>Descriptions</title>
        <link rel="stylesheet" href="{{ elixir('css/app.css') }}" />
    </head>

    <body>
        <div class="container">
            <div class="row">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        Articles <small>({{ $descriptions->count() }})</small>
                    </div>
                    <div class="panel-body">
                        @forelse ($descriptions as $description)
                            <article>
                                <h2>{{ $description->curie }}</h2>
                                <p>{{ $description->body }}</body>
                            </article>
                        @empty
                            <p>No descriptions found</p>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
