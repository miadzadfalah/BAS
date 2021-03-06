

function _ensure_http_client()
{
    if(typeof(HttpClient)=='undefined')
        new_http_client();
}

function on_http_client_loaded()
{
    NEED_PARSE_HTML = true
    if(!FAIL_ON_ERROR)
    {
        return;
    }
    if(HttpClient.WasError())
	{
        fail(HttpClient.GetErrorString());
    }
}


function new_http_client()
{
    ScriptWorker.NewHttpClient()
    FAIL_ON_ERROR = true
    NEED_PARSE_HTML = true
}

function http_client_set_fail_on_error(fail_on_error)
{
    _ensure_http_client()
    FAIL_ON_ERROR = fail_on_error
}

function http_client_was_error()
{
    _ensure_http_client()
    return HttpClient.WasError();
}


function http_client_error_string()
{
    _ensure_http_client()
    return HttpClient.GetErrorString();
}



function http_client_get(url, callback)
{
    _ensure_http_client();
    ScriptWorker.HttpClientGetRedirect(url,"on_http_client_loaded();" + _get_function_body(callback));
}

function http_client_download(url, file, callback)
{
    _ensure_http_client();
    ScriptWorker.HttpClientDownload(url, file, "on_http_client_loaded();" + _get_function_body(callback));
}



function http_client_solve(method, url, callback)
{
    _ensure_http_client();
    _HTTP_CLIENT_SOLVE = [method, callback];

    ScriptWorker.HttpClientGetRedirect(url,"on_http_client_loaded();ScriptWorker.Solve(_HTTP_CLIENT_SOLVE[0], http_client_content_base64(),_get_function_body(_HTTP_CLIENT_SOLVE[1]));");
}

function http_client_post(url, params, post_options, callback)
{
    _ensure_http_client();
    var p = []
    for(var k in params)
    {
 		p.push(k);
 		p.push(params[k]);
	}
    var p1 = []
    if(typeof(post_options) === "function")
    {
        callback = post_options
    }else
    {
        for(var k in post_options)
        {
            p1.push(k);
            p1.push(post_options[k]);
        }
    }
    ScriptWorker.HttpClientPostRedirect(url, p, p1, "on_http_client_loaded();" + _get_function_body(callback));
}


function http_client_get_no_redirect(url, callback)
{
    _ensure_http_client();
    ScriptWorker.HttpClientGetNoRedirect(url,"on_http_client_loaded();" + _get_function_body(callback));
}

function http_client_post_no_redirect(url, params, post_options, callback)
{
    _ensure_http_client();
    var p = []
    for(var k in params)
    {
        p.push(k);
        p.push(params[k]);
    }
    var p1 = []
    if(typeof(post_options) === "function")
    {
        callback = post_options
    }else
    {
        for(var k in post_options)
        {
            p1.push(k);
            p1.push(post_options[k]);
        }
    }
    ScriptWorker.HttpClientPostNoRedirect(url, p, p1, "on_http_client_loaded();" + _get_function_body(callback));
}

function http_client_url()
{
    _ensure_http_client();
    return HttpClient.GetLastUrl();
}


function http_client_content()
{
	_ensure_http_client();
	return HttpClient.GetContent();
}

function http_client_content_base64()
{
    _ensure_http_client();
    return HttpClient.GetBase64();
}


function http_client_header(header)
{
	_ensure_http_client();
	return HttpClient.GetHeader(header);
}

function http_client_status()
{
	_ensure_http_client();
	return HttpClient.GetStatus();
}

function http_client_set_header(header_name, header_value)
{
	_ensure_http_client();
	HttpClient.AddHeader(header_name, header_value);
}

function http_client_clear_header()
{
	_ensure_http_client();
	HttpClient.CleanHeader();
}



function http_client_proxy(proxy_string)
{
	_ensure_http_client();
    var proxy_parsed = proxy_parse(proxy_string);
    http_client_set_proxy(proxy_parsed["server"], proxy_parsed["Port"], proxy_parsed["IsHttp"], proxy_parsed["name"], proxy_parsed["password"])
}

function http_client_set_proxy(server, Port, IsHttp, name, password)
{
	_ensure_http_client();
	HttpClient.SetProxy(server, Port, IsHttp, name, password);
}

function http_client_get_cookies(url)
{
    _ensure_http_client();
	return HttpClient.GetCookiesForUrl(url);
}

function http_client_save_cookies()
{
    _ensure_http_client();
    return HttpClient.SaveCookies();
}

function http_client_restore_cookies(cookies)
{
    _ensure_http_client();
    HttpClient.RestoreCookies(cookies);
}

function http_client_xpath_parse()
{
    if(NEED_PARSE_HTML)
    {
        html_parser_xpath_parse(http_client_content())
        NEED_PARSE_HTML = false
    }
}

function http_client_xpath_xml(query, do_not_fail)
{
    http_client_xpath_parse()
    if(!do_not_fail && !http_client_xpath_exist(query))
        fail("Can't resolve query " + query);


    return html_parser_xpath_xml(query)
}

function http_client_xpath_text(query, do_not_fail)
{
    http_client_xpath_parse()
    if(!do_not_fail && !http_client_xpath_exist(query))
        fail("Can't resolve query " + query);

    return html_parser_xpath_text(query)
}


function http_client_xpath_xml_list(query, do_not_fail)
{
    http_client_xpath_parse()
    if(!do_not_fail && !http_client_xpath_exist(query))
        fail("Can't resolve query " + query);


    return html_parser_xpath_xml_list(query)
}

function http_client_xpath_text_list(query, do_not_fail)
{
    http_client_xpath_parse()
    if(!do_not_fail && !http_client_xpath_exist(query))
        fail("Can't resolve query " + query);

    return html_parser_xpath_text_list(query)
}

function http_client_xpath_count(query)
{
    http_client_xpath_parse()
    return html_parser_xpath_count(query)
}

function http_client_xpath_exist(query)
{
    http_client_xpath_parse()
    return html_parser_xpath_exist(query)
}
