@extends('layouts.app')

@section('content')
<!-- notifikasi -->
<div id="page-container">
            <main id="main-container">
                <div class="hero-static d-flex align-items-center">
                    <div class="w-100">
                        <div class="bg-white">
                            <div class="content content-full">
                                <div class="row justify-content-center">
                                    <div class="col-md-8 col-lg-6 col-xl-4 py-4" ng-controller="Login">
                                        <div class="text-center">
                                            <p class="mb-2">
                                                <i class="fa fa-2x fa-circle-notch text-primary"></i>
                                            </p>
                                            <h1 class="h4 mb-1">
                                                Sign In
                                            </h1>
                                        </div>
                                        <div style="text-align: center;" ng-hide="load">
                                            <div class="spinner-border text-primary" style="width: 1rem;height: 1rem;" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        <div ng-hide="notife" class="js-animation-object animated fadeIn" style="text-align: center;">
                                            <some-elemet ng-show="succes" style="color: green">Login Succes</some-elemet>
                                            <some-elemet ng-show="error" style="color: red">Login Error</some-elemet>
                                        </div>
                                        <form ng-submit="save()" enctype="multipart/form-data" >
                                            @csrf
                                            <div class="py-3">
                                                <div class="form-group">
                                                    <input type="text" class="form-control form-control-lg form-control-alt" id="login-username" name="name" ng-model="form.name" placeholder="Username" >
                                                </div>
                                                @error('email')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror
                                                <div class="form-group">
                                                    <input type="password" class="form-control form-control-lg form-control-alt" id="login-password" name="password" ng-model="form.password" placeholder="Password">
                                                </div>
                                                @error('password')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror
                                            </div>
                                            <div class="form-group row justify-content-center mb-0">
                                                <div class="col-md-6 col-xl-5">
                                                    <button type="submit" id="submit" class="btn btn-block btn-primary">
                                                        <i class="fa fa-fw fa-sign-in-alt mr-1"></i> Sign In
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="font-size-sm text-center text-muted py-3">
                            &copy; <span data-toggle="year-copy"></span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
@endsection
